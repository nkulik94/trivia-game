class TimerChannel < ApplicationCable::Channel
  @@subscribers = {}

  @@ready = {}

  def self.subscribers
    @@subscribers
  end

  def self.ready
    @@ready
  end

  def subscribed
    TimerChannel.subscribers[current_user.id] = true
    stream_from "timer_for_#{params[:game_id]}_channel"
  end

  def receive data
    TimerChannel.ready[data['id']] = true
    game = Game.find(params[:game_id])
    if TimerChannel.ready[game.player_1.id] && TimerChannel.ready[game.player_2.id]
      game.set_timer(10)
      game.update(message: "#{game.player_1.name}'s turn", awaiting_form: true)
      game.broadcast
      thr = Thread.new do
        game.start_turn thr
      end
    end
  end

  def unsubscribed
    TimerChannel.subscribers.delete current_user.id
    game = Game.find(params[:game_id])
    game.handle_thread unless TimerChannel.subscribers[game.player_1.id] || TimerChannel.subscribers[game.player_2.id]
    stop_all_streams
  end
end
