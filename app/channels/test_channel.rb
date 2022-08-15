class TestChannel < ApplicationCable::Channel
  def subscribed
    stream_from "test_channel"
  end

  # def received
  #   questions = []
  #   rand(1..10).times { questions << Question.all.sample }
  #   ActionCable.server.broadcast("test_channel", { list: questions })
  # end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
