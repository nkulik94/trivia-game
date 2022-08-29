class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :category, :difficulty, :question, :correct_answer, :all_answers

  def all_answers
    self.object.all_answers_string.split('|')
  end
end
