class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :question, :answer, :reviewed, :approved

  belongs_to :user
  has_many :upvotes
end
