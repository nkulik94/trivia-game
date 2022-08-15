class Question < ApplicationRecord
    validates :question, presence: true, uniqueness: true
    validates :category, presence: true
    validates :difficulty, inclusion: { in: %w(easy medium hard) }
    validates :correct_answer, presence: true
    validates :incorrect_answers, presence: true


    def self.get_and_save_questions token, difficulty
        10.times do
            questions_json = RestClient.get "https://opentdb.com/api.php?amount=50&difficulty=#{difficulty}&type=multiple&token=#{token}"
            questions = JSON.parse(questions_json)
            questions['results'].each do |question|
                new_question = create!({
                    category: question['category'],
                    difficulty: question["difficulty"],
                    question: question['question'],
                    correct_answer: question['correct_answer'],
                    incorrect_answers: question['incorrect_answers'].join('|')
                })
                puts new_question.question
            end
            puts difficulty
            sleep(1)
        end
    end

    def self.get_all_questions token
        #categories = [{num: 9, name: "General Knowledge"}, {num: 17, name: "Science & Nature"}, {num: 21, name: "Sports"}, {num: 22, name: "Geography"}, {num: 23, name: "History"}]
        difficulties = ['easy', 'medium', 'hard']
        difficulties.each { |difficulty| self.get_and_save_questions(token, difficulty) }
    end
end
