class GameChannel < ApplicationCable::Channel
  @@subscribers = {}

  def self.subscribers
    @@subscribers
  end

  def opponent
    game = Game.find(params[:game_id])
    game.player_1.id === current_user.id ? game.player_2 : game.player_1
  end

  def timer value
    time = value
    while time >= 0 do
      ActionCable.server.broadcast("game_#{params[:game_id]}_channel", {time_remaining: time})
      time -= 1
      sleep(1)
    end
  end

  def subscribed
    game = Game.find(params[:game_id])
    GameChannel.subscribers["#{current_user.id}"] = true
    stream_from "game_#{params[:game_id]}_channel"
    # if GameChannel.subscribers["#{game.player_1.id}"] && GameChannel.subscribers["#{game.player_2.id}"]
    #   self.timer 30
    # end
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
