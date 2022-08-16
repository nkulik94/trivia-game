class ChallengeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "challenge_channel"
  end

  def unsubscribed
    stop_all_streams
  end
end
