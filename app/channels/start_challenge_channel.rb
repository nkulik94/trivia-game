class StartChallengeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{params[:user_id]}_challenge"
  end

  def receive(data)
    ActionCable.server.broadcast("#{params[:user_id]}_challenge", data)
  end

  def unsubscribed
    user = User.find(params[:user_id])
    if user.challenge
      user.challenge.destroy
      id = user.challenge.id
      ActionCable.server.broadcast("challenge_channel", { challenge: { deleted: true, id: id} })
    end
    stop_stream_from "#{params[:user_id]}_challenge"
  end
end
