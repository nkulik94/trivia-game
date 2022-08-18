class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}_channel"
  end

  def receive data
    game = Game.find(params[:id])
    if data.difficulty
      question = game.get_question(data)
      ActionCable.server.broadcast("game_#{params[:game_id]}_channel", question)
    end

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
