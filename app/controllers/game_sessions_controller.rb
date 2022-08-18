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
            head :no_content
        end
    end
end
