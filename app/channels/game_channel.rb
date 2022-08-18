class GameChannel < ApplicationCable::Channel
  @@subscribers = {}

  def self.subscribers
    @@subscribers
  end

  def subscribed
    GameChannel.subscribers["#{current_user.id}"] = true
    stream_from "game_#{params[:game_id]}_channel"
  end

  def receive data
    game = Game.find(params[:game_id])
    if data['difficulty']
      question = game.get_question(difficulty: data['difficulty'])
      ActionCable.server.broadcast("game_#{params[:game_id]}_channel", question)
    end

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
