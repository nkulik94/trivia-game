class GamesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        game = User.find(session[:user_id]).games.create(player_2_id: params[:player_2_id], stakes: params[:stakes], pool: params[:stakes] * 2, turn: 'player_1')
        ActionCable.server.broadcast("#{session[:user_id]}_challenge", {game_id: game.id})
        render json: game, status: :created
    end

    private

    def create_params
        params.permit(:player_2_id, :stakes)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: 'You must be logged in to play!' }, status: :unauthorized unless session.include? :user_id
    end
end
