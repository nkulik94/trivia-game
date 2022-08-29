class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :category, :difficulty, :question, :correct_answer, :all_answers, :two_answers

  def all_answers
    answers = self.object.incorrect_answers.split('|') + [self.object.correct_answer]
    answers.shuffle
  end

  def two_answers
    [self.object.incorrect_answers.split('|').sample, self.object.correct_answer].shuffle
  end
end
