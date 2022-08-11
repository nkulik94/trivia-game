class Question < ApplicationRecord
    validates :question, uniqueness: true

    def self.get_and_save_questions token
        questions_json = RestClient.get "https://opentdb.com/api.php?amount=50&type=multiple&token=#{token}"
        questions = JSON.parse(questions_json)
        questions['results'].each do |question|
            new_question = create({
                category: question['category'],
                difficulty: question["difficulty"],
                question: question['question'],
                correct_answer: question['correct_answer'],
                incorrect_answers: question['incorrect_answers'].join('|')
            })
            puts new_question.question
            puts new_question.incorrect_answers
        end
        sleep(1)
        get_and_save_questions(token) unless self.all.count > 1500 || questions['response_code'] != 0
    end
end
