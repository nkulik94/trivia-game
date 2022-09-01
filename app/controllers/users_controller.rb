class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        user = User.create!(user_params)
        user.update(avatar_url: Faker::Avatar.image) unless params[:avatar_url]
        user.update(points: 500)
        session[:user_id] = user.id
        if AdminKey.first.authenticate(params[:name])
            session[:is_admin] = true
            Admin.create(username: user.username, email:user.email)
            user.update(points: 0, name: 'Placeholder')
        end
        render json: user, status: :created
    end

    def show
        if session[:user_id]
            render json: User.find(session[:user_id]), status: :created
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    private

    def user_params
        params.permit(:name, :username, :email, :password, :password_confirmation, :avatar_url)
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
