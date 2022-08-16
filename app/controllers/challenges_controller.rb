class ChallengesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: Challenge.all
    end

    private

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: 'You must be logged in to play!' }, status: :unauthorized unless session.include? :user_id
    end
end
