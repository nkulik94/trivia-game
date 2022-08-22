class GameChannel < ApplicationCable::Channel
  @@subscribers = {}
  @@threads = {}

  def self.subscribers
    @@subscribers
  end

  def self.threads
    @@threads
  end

  def subscribed
    game = Game.find(params[:game_id])
    GameChannel.subscribers["#{current_user.id}"] = true
    stream_from "game_#{params[:game_id]}_channel"
  end

  def receive data
    game = Game.find(params[:game_id])
    # if data['kill']
    #   Game.kill_thread[game.id] = true
    # end
  end

  def unsubscribed
    GameChannel.subscribers.delete "#{current_user.id}"
    game = Game.find(params[:game_id])
    if game.over?
      stop_stream_from "game_#{params[:game_id]}_channel"
    end
    sleep(10)
    if !GameChannel.subscribers["#{current_user.id}"] && !game.over?
      ActionCable.server.broadcast("game_#{params[:game_id]}_channel", {forfeited: current_user.id})
    end
  end
end
