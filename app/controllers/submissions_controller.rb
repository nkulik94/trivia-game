class SubmissionsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: Submission.where(approved: false).order(upvotes_count: :desc)
    end

    def create
        user = User.find(session[:user_id])
        new_submission = user.submissions.create!(submission_params)
        render json: new_submission, status: :created
    end

    def update
        submission = Submission.find(params[:id])
        return render json: { errors: ["You can't edit a submission that's already been reviewed!"] }, status: :unprocessable_entity if submission.reviewed
        submission.update!(submission_params)
        render json: submission, status: :accepted
    end

    def destroy
        submission = Submission.find(params[:id])
        submission.destroy
        head :ok
    end

    private

    def submission_params
        params.permit(:question, :answer)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: 'You must be logged in to submit a question!' }, status: :unauthorized unless session.include? :user_id
    end
end
