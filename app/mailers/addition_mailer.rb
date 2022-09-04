class AdditionMailer < ApplicationMailer

    def addition_email
        @submission = params[:submission]
        mail(to: @submission.user.email, subject: "Your question has been added to the database")
    end
end
