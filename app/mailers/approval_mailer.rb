class ApprovalMailer < ApplicationMailer
    
    def approval_email
        @submission = params[:submission]
        mail(to: @submission.user.email, subject: 'You question has been approved!')
    end
end
