class Game < ApplicationRecord
    belongs_to :player_1, class_name: 'User', foreign_key: :user_id
    belongs_to :player_2, class_name: 'User', foreign_key: :player_2_id
    has_and_belongs_to_many :questions

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

    def set_timer value
        time = value
        while time >= 0 do
          ActionCable.server.broadcast("timer_for_#{self.id}_channel", {timer_count: time})
          time -= 1
          sleep(1)
        end
    end
end
