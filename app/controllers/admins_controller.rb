class AdminsController < ApplicationController

    # def show
    #     if session[:is_admin]
    #         head :ok
    #     else
    #         head :unauthorized
    #     end
    # end

    def show
        if AdminKey.first.authenticate(params[:password])
            session[:is_admin] = true
            head :ok
        else
            render json: { error: "Incorrect password" }, status: :unauthorized
        end
    end

end
