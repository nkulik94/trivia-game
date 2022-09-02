class QuestionsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: Question.all, each_serializer: QuestionListSerializer
    end

    def show
        render json: Question.find(params[:id]), serializer: QuestionEditSerializer
    end

    def create
        all_answers = [params[:incorrect_1], params[:incorrect_2], params[:incorrect_3]] + [params[:correct_answer]]
        question = Question.create!(question: params[:question], correct_answer: params[:correct_answer], difficulty: params[:difficulty], category: params[:category], all_answers_string: all_answers.shuffle.join('|'))
        render json: question, status: :created
    end

    def update
        all_answers = [params[:incorrect_1], params[:incorrect_2], params[:incorrect_3]] + [params[:correct_answer]]
        question = Question.find(params[:id])
        question.update!(question: params[:question], correct_answer: params[:correct_answer], difficulty: params[:difficulty], category: params[:category], all_answers_string: all_answers.shuffle.join('|'))
        render json: question, status: :created
    end

    def destroy
        question = Question.find(params[:id])
        question.destroy
        head :no_content
    end

    private

    def authorize
        return render json: { error: 'Only Admins can perform this action!' }, status: :unauthorized unless session[:is_admin]
    end

    def render_not_found_response
        render json: { error: "Question not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
