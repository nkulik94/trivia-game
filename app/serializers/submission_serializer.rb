class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :question, :answer, :reviewed, :approved
end
