class GamesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def show
        game = Game.find(params[:id])
        session[:game_id] = game.id
        render json: game
    end

    def create
        game = User.find(session[:user_id]).games.create!(player_2_id: params[:player_2_id], stakes: params[:stakes], pool: params[:stakes] * 2, player_1_turn: true)
        ActionCable.server.broadcast("#{session[:user_id]}_challenge", {game_id: game.id})
        session[:game_id] = game.id
        render json: game, status: :created
    end

    def update
        game = Game.find(params[:id])
        return render json: { errors: ["Not enough points in the pool!"] }, status: :unprocessable_entity if params[:current_stakes] > game.pool
        return render json: { errors: ["Too late!"] }, status: :unprocessable_entity unless game.awaiting_form
        game.handle_form(params)
        head :ok
    end

    private

    def render_not_found_response
        render json: { error: "Game not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: 'You must be logged in to play!' }, status: :unauthorized unless session.include? :user_id
    end
end
