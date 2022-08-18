class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :category, :difficulty, :question, :correct_answer, :incorrect_answer_arr

  def incorrect_answer_arr
    self.object.incorrect_answers.split('|')
  end
end
