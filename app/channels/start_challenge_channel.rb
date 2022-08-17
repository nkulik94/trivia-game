class StartChallengeChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{params[:user_id]}_challenge"
  end

  def unsubscribed
    user = User.find(current_user.id)
    id = user.challenge.id
    user.challenge.destroy
    ActionCable.server.broadcast("challenge_channel", { challenge: { deleted: true, id: id} })
    stop_stream_from "#{params[:user_id]}_challenge"
  end
end
