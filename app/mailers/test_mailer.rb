class TestMailer < ApplicationMailer
    default from: ENV['SMTP_USER_NAME']

    def test_email
        @user = params[:user]
        mail(to: 'naftalikulikse@gmail.com', subject: "let's hope this works")
    end
end
