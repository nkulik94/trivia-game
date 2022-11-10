class GameChannel < ApplicationCable::Channel
  @@subscribers = {}

  def self.subscribers
    @@subscribers
  end

  def subscribed
    game = Game.find(params[:game_id])
    GameChannel.subscribers["#{current_user.id}"] = true
    stream_from "game_#{params[:game_id]}_channel"
  end

  def receive data
    game = Game.find(params[:game_id])
    if data['buzzed_by'] && !game.buzzed_by_id
      id = data['buzzed_by']
      game.handle_buzzed(id)
    end
    if data['answer']
      game.handle_answer(data)
    end
  end

  def unsubscribed
    GameChannel.subscribers.delete "#{current_user.id}"
    game = Game.find(params[:game_id])
    if game.over?
      stop_stream_from "game_#{params[:game_id]}_channel"
      return
    end
    sleep(20)
    unless GameChannel.subscribers["#{game.user_id}"] || GameChannel.subscribers["#{game.player_2_id}"]
      game.handle_thread
      game.destroy
    end
  end
end
