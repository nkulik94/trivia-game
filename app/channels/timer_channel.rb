class TimerChannel < ApplicationCable::Channel
  def subscribed
    stream_from "timer_for_#{params[:game_id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
