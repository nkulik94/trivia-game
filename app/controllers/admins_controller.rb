class AdminsController < ApplicationController

    def show
        if session[:is_admin]
            head :ok
        else
            head :unauthorized
        end
    end
end
