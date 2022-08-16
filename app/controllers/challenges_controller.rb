class ChallengesController < ApplicationController
    #before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: Challenge.all
    end

    def create
        user = User.find(params[:user_id])
        challenge = user.create_challenge(stakes: params[:stakes])
        serialized_challenge = ActiveModelSerializers::Adapter::Json.new(
            ChallengeSerializer.new(challenge)
          ).serializable_hash
        ActionCable.server.broadcast("challenge_channel", serialized_challenge)
        head :ok
    end

    private

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: 'You must be logged in to play!' }, status: :unauthorized unless session.include? :user_id
    end
end
