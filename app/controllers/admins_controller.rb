class AdminsController < ApplicationController

    def show
        if AdminKey.first.authenticate(params[:password])
            session[:is_admin] = true
            head :ok
        else
            render json: { error: "Incorrect password" }, status: :unauthorized
        end
    end

end
