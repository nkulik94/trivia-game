class TimerChannel < ApplicationCable::Channel
  @@subscribers = {}

  def self.subscribers
    @@subscribers
  end

  def subscribed
    stream_from "timer_for_#{params[:game_id]}_channel"
  end

  def receive data
    TimerChannel.subscribers[data['id']] = true
    game = Game.find(params[:game_id])
    if TimerChannel.subscribers[game.player_1.id] && TimerChannel.subscribers[game.player_2.id]
      game.set_timer(30)
    end
  end

  def unsubscribed
    TimerChannel.subscribers.delete "#{current_user.id}"
  end
end
