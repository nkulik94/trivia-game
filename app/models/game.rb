class Game < ApplicationRecord
    belongs_to :player_1, class_name: 'User', foreign_key: :user_id
    belongs_to :player_2, class_name: 'User', foreign_key: :player_2_id
    has_and_belongs_to_many :questions

    @@kill_thread = {}

    def self.kill_thread
        @@kill_thread
    end

    def over?
        self.pool == 0
    end

    def get_question difficulty
        question = self.find_new_question(difficulty)
        self.questions << question
        serialized_question = ActiveModelSerializers::Adapter::Json.new(
        QuestionSerializer.new(question)
        ).serializable_hash
        serialized_question
    end

    def find_new_question difficulty
        question = Question.where(difficulty).sample
        self.questions.find_by(id: question.id) ? self.find_new_question(difficulty) : question
    end

    def broadcast_game
        serialized_game = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(self)
        ).serializable_hash
        ActionCable.server.broadcast("game_#{self.id}_channel", serialized_game)
    end

    def set_timer value, thread = false
        time = value
        #thread = Thread.new do
        while time >= 0 do
            if !Game.kill_thread[self.id]
            ActionCable.server.broadcast("timer_for_#{self.id}_channel", {timer_count: time})
            time -= 1
            sleep(1)
            else
                thread.kill if thread
            end
        end
        #end
    end

    def start_turn thread
        set_timer(5, thread)
        self.update(message: "Time's up, next player's turn!", player_1_turn: !self.player_1_turn)
        self.broadcast_game
        sleep(2)
        self.update(message: "#{self.player_1_turn ? self.player_1.name : self.player_2.name}'s turn")
        self.broadcast_game
        start_turn(thread)
    end
end
