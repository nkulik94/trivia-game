class QuestionEditSerializer < ActiveModel::Serializer
  attributes :id, :question, :correct_answer, :category, :difficulty, :incorrect_answers

  def incorrect_answers
    self.object.all_answers_string.split('|').filter { |answer| answer != self.object.correct_answer }
  end
end
