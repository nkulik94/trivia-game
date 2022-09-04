class Submission < ApplicationRecord
    belongs_to :user
    has_many :upvotes
    validates :question, presence: true
    validates :answer, presence: true

    def handle_added
        AdditionMailer.with(submission: self).addition_email.deliver_later
        user = User.find(self.user.id)
        user.update(points: user.points + 100)
        self.update(added: true)
    end

    def handle_approved
        ApprovalMailer.with(submission: self).approval_email.deliver_later
        self.update(approved: true)
    end

    def handle_rejected
        self.update(reviewed: true)
    end

    def handle_reviewed params
        params[:approved] ? self.handle_approved : self.handle_rejected
    end
end
