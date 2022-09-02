class QuestionListSerializer < ActiveModel::Serializer
  attributes :id, :question, :correct_answer
end
