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
            if !Game.kill_thread[self.id]
                ActionCable.server.broadcast("timer_for_#{self.id}_channel", {timer_count: time})
                time -= 1
                sleep(1)
            else
                thread.kill if thread
            end
        end
        thread.kill if thread && Game.kill_thread[self.id]
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
        Game.kill_thread[self.id] = true
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name} has chosen a#{params[:difficulty] === 'easy' ? 'n' : nil} #{params[:difficulty]} question", current_stakes: params[:current_stakes], awaiting_form: false)
        self.broadcast
        sleep(2)
        Game.kill_thread[self.id] = false
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name} has set the stakes at #{params[:current_stakes]} points")
        self.broadcast
        sleep(2)
        question = self.find_new_question(params[:difficulty])
        self.update(message: "Get those buzzers ready, here's the question")
        self.broadcast
        sleep(1)
        self.update(current_question_id: question.id, awaiting_buzzer: true)
        self.broadcast
        self.buzzer_timer
    end

    def buzzer_timer
        thread = Thread.new do
            set_timer(10, thread)
            self.reset
            self.update(message: "Time's up, next player's turn!", player_1_turn: !self.player_1_turn, awaiting_form: false)
            self.broadcast
            sleep(2)
            self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name}'s turn", awaiting_form: true)
            self.broadcast
            start_turn(thread)
        end
    end

    def reset
        self.update(current_answer: nil, buzzed_by_id: nil, current_stakes: nil, current_question_id: nil, awaiting_buzzer: false)
    end
end
