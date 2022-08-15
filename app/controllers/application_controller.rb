class ApplicationController < ActionController::API
    include ActionController::Cookies

    def hello
        questions = []
        rand(1..10).times { questions << Question.all.sample }
        ActionCable.server.broadcast("test_channel", { list: questions })
    end
end
