class Game < ApplicationRecord
    belongs_to :player_1, class_name: 'User', foreign_key: :user_id
    belongs_to :player_2, class_name: 'User', foreign_key: :player_2_id
    has_and_belongs_to_many :questions

    validates :current_stakes, numericality: { :greater_than => 0 }, if: :current_stakes

    @@kill_thread = {}

    def self.kill_thread
        @@kill_thread
    end

    def over?
        self.pool == 0
    end

    def find_new_question difficulty
        question = Question.where(difficulty: difficulty).sample
        self.questions.find_by(id: question.id) ? self.find_new_question(difficulty: difficulty) : question
        self.questions << question
        question
    end

    def broadcast
        serialized_game = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(self)
        ).serializable_hash
        ActionCable.server.broadcast("game_#{self.id}_channel", serialized_game)
    end

    def set_timer value, thread = false
        time = value
        while time >= 0 do
            ActionCable.server.broadcast("timer_for_#{self.id}_channel", {timer_count: time})
            time -= 1
            sleep(1)
            thread.kill if thread && Game.kill_thread[self.id]
        end
        #thread.kill if thread && Game.kill_thread[self.id]
    end

    def start_turn thread
        set_timer(15, thread)
        self.update(message: "Time's up, next player's turn!", player_1_turn: !self.player_1_turn, awaiting_form: false)
        self.broadcast
        sleep(2)
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name}'s turn", awaiting_form: true)
        self.broadcast
        start_turn(thread)
    end

    def handle_form params
        self.handle_thread
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name} has chosen a#{params[:difficulty] === 'easy' ? 'n' : nil} #{params[:difficulty]} question", current_stakes: params[:current_stakes], awaiting_form: false)
        self.broadcast
        sleep(2)
        self.handle_thread
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name} has set the stakes at #{params[:current_stakes]} points")
        self.broadcast
        sleep(2)
        question = self.find_new_question(params[:difficulty])
        self.update(message: "Get those buzzers ready, here's the question")
        self.broadcast
        sleep(1)
        self.update(current_question_id: question.id)
        self.broadcast
        thread = Thread.new do
            set_timer(10, thread)
            self.reset(thread)
        end
    end

    def current_question
        Question.find(self.current_question_id)
    end

    def handle_buzzed id
        self.handle_thread
        #name = self.user_id == id ? self.player_1.name : self.player_2.name
        opponent_name = self.user_id == id ? self.player_2.name : self.player_1.name
        self.update(message: "#{self.get_player(id).name} is ready to answer!")
        self.broadcast
        sleep(1.05)
        self.handle_thread
        self.update(buzzed_by_id: id, message: "#{self.get_player(id).name} must answer before the countdown clock hits 0")
        self.broadcast
        thread = Thread.new do
            set_timer(10, thread)
            self.update(message: "Time's up! #{opponent_name} will have a chance now!")
            self.broadcast
            set_timer(10, thread)
            self.reset(thread)
        end
    end

    def answering_user_verified? id
        return id == self.buzzed_by_id unless self.message.include? "will have a chance now!"
        id != self.buzzed_by_id
    end

    def handle_winnings id, winnings
        id == user_id ? self.update(pool: self.pool - winnings, player_1_winnings: self.player_1_winnings + winnings) : self.update(pool: self.pool - winnings, player_2_winnings: self.player_2_winnings + winnings)
    end

    def handle_answer data
        if answering_user_verified?(data['id'])
            self.handle_thread
            if self.current_question.is_correct_answer?(data['answer'])
                winnings = data['id'] == self.buzzed_by_id ? self.current_stakes : self.current_stakes / 2
                self.update(message: "#{self.get_player(data['id']).name} is correct! #{self.get_player(data['id']).name} has won #{winnings} points!")
                self.broadcast
                sleep(1.1)
                self.handle_thread
            end
        end
    end

    def get_player id
        id == self.user_id ? self.player_1 : self.player_2
    end

    def handle_thread
        Game.kill_thread[self.id] = !Game.kill_thread[self.id]
    end

    def reset thread
        self.update(current_answer: nil, buzzed_by_id: nil, current_stakes: nil, current_question_id: nil, message: "Time's up, next player's turn!", player_1_turn: !self.player_1_turn, awaiting_form: false)
        self.broadcast
        sleep(2)
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name}'s turn", awaiting_form: true)
        self.broadcast
        start_turn(thread)
    end
end
