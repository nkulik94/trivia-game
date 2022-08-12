class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        user = User.create!(user_params)
        user.update(points: 500)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        if session[:user_id]
            render json: User.find(session[:user_id]), status: :created
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:name, :username, :email, :password, :password_confirmation)
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
