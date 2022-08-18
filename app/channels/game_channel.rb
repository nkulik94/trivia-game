class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}_channel"
  end

  def receive data
    question = Question.where(data).sample until !Game.find(params[:id]).questions.find_by(id: question.id)
    
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
