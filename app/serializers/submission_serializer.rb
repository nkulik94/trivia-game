class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :question, :answer, :status, :upvotes_count

  def status
    return "Added" if self.object.added
    return 'Approved' if self.object.approved
    return 'Pending Review' unless self.object.reviewed
    'Rejected'
  end

  belongs_to :user
end
