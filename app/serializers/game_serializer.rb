class GameSerializer < ActiveModel::Serializer
  attributes :id, :stakes, :player_1_winnings, :player_2_winnings, :pool, :buzzed_by_id, :player_1_turn, :message, :current_question, :awaiting_form, :current_answer, :current_stakes, :over

  def current_question
    self.object.current_question.serialize if self.object.current_question
  end

  def over
    self.object.over?
  end

  belongs_to :player_1
  belongs_to :player_2
end
