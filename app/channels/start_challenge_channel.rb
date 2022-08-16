class StartChallengeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{params[:id]}_challenge"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
