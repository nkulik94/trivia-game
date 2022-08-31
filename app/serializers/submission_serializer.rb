class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :question, :answer, :status, :upvotes_count

  def status
    return 'Approved' if self.object.approved
    return 'Pending Review' unless self.object.reviewed
    'Rejected'
  end

  # def upvote_count
  #   self.object.upvotes.count
  # end

  belongs_to :user
end
