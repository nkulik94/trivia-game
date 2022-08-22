class GameSerializer < ActiveModel::Serializer
  attributes :id, :stakes, :player_1_winnings, :player_2_winnings, :pool, :buzzed_by_id, :player_1_turn, :message, :current_question, :awaiting_form

  def current_question
    if self.object.current_question_id
      question = self.object.questions.find(self.object.current_question_id)
      question.serialize
    end
  end

  belongs_to :player_1
  belongs_to :player_2
end
