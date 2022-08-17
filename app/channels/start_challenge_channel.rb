class StartChallengeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{params[:user_id]}_challenge"
  end

  def receive(data)
    ActionCable.server.broadcast("#{params[:user_id]}_challenge", data)
  end

  def unsubscribed
    user = User.find(current_user.id)
    if user.challenge
      id = user.challenge.id
      user.challenge.destroy
    end
    ActionCable.server.broadcast("challenge_channel", { challenge: { deleted: true, id: id} })
    stop_stream_from "#{params[:user_id]}_challenge"
  end
end
