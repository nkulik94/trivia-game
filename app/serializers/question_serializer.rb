class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :category, :difficulty, :question, :correct_answer, :all_answers

  def all_answers
    answers = self.object.incorrect_answers.split('|') + [self.object.correct_answer]
    answers.shuffle
  end
end
