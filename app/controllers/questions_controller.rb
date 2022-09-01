class QuestionsController < ApplicationController
    before_action :authorize

    def index
        render json: Question.all
    end

    private

    def authorize
        return render json: { error: 'Only Admins can perform this action!' }, status: :unauthorized unless session[:is_admin]
    end
end
