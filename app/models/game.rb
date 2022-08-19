class Game < ApplicationRecord
    attr_accessor :player_1_ready, :player_2_ready, :player_1_joined, :player_2_joined
    belongs_to :player_1, class_name: 'User', foreign_key: :user_id
    belongs_to :player_2, class_name: 'User', foreign_key: :player_2_id
    has_and_belongs_to_many :questions

    def over?
        self.pool == 0
    end

    def set_ready id
        id == self.player_1.id ? self.player_1_ready = true : self.player_2_ready = true
    end

    def set_joined id
        id == self.player_1.id ? self.player_1_joined = true : self.player_2_joined = true
    end

    def ready?
        (self.player_1_ready && self.player_2_ready) == true
    end

    def joined?
        (self.player_1_joined && self.player_2_joined) == true
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
end
