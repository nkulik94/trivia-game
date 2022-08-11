class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :category, :difficulty, :question, :correct_answer, :incorrect_answers
end
