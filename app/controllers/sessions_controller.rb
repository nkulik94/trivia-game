class SessionsController < ApplicationController

    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            #session[:is_admin] = true if Admin.find_by(username: user.username)
            render json: user, status: :created
        else
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def admin_show
        if session[:is_admin]
            head :ok
        else
            head :unauthorized
        end
    end

    def destroy
        if session[:user_id]
            session.delete :user_id
            session.delete :is_admin if session[:is_admin]
            head :no_content
        else
            render json: { errors: ["No user logged in"] }, status: :unauthorized
        end
    end
end
