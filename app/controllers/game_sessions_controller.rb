class GameSessionsController < ApplicationController

    def show
        if session[:game_id]
            render json: Game.find(session[:game_id])
        else
            render json: { error: "Not found" }, status: :not_found
        end
    end

    def destroy
        if session[:game_id]
            session.delete :game_id
            user = User.find(session[:user_id])
            render json: { points: user.points, record: "#{user.wins} - #{user.losses}" }
        end
    end
end
