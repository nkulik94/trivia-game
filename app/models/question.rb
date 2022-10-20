class Question < ApplicationRecord
    has_and_belongs_to_many :games
    validates :question, presence: true, uniqueness: true
    validates :category, presence: true
    validates :difficulty, inclusion: { in: %w(easy medium hard) }
    validates :correct_answer, presence: true
    validates :all_answers_string, presence: true


    def self.get_and_save_questions token, difficulty
        10.times do
            questions_json = RestClient.get "https://opentdb.com/api.php?amount=50&difficulty=#{difficulty}&type=multiple&token=#{token}"
            questions = JSON.parse(questions_json)
            questions['results'].each do |question|
                all_answers = question['incorrect_answers'] + [question['correct_answer']]
                new_question = create({
                    category: question['category'],
                    difficulty: question["difficulty"],
                    question: question['question'],
                    correct_answer: question['correct_answer'],
                    all_answers_string: all_answers.shuffle.join('|')
                })
                new_question.fix_punctuation
                puts new_question.question
            end
            puts difficulty
            sleep(1)
        end
    end

    def fix_punctuation
        self.question['&quot;'] = "\"" until !self.question['&quot;']
        self.question['&#039;'] = "\'" until !self.question['&#039;']
        self.question['&eacute;'] = "\u00E9" until !self.question['&eacute;']
        self.all_answers_string['&quot;'] = "\"" until !self.all_answers_string['&quot;']
        self.all_answers_string['&#039;'] = "\'" until !self.all_answers_string['&#039;']
        self.all_answers_string['&eacute;'] = "\u00E9" until !self.all_answers_string['&eacute;']
        self.save
    end

    def self.get_all_questions token
        difficulties = ['easy', 'medium', 'hard']
        difficulties.each { |difficulty| self.get_and_save_questions(token, difficulty) }
    end

    def serialize
        serialized_question = ActiveModelSerializers::Adapter::Json.new(
        QuestionSerializer.new(self)
        ).serializable_hash
        serialized_question[:question]
    end

    def is_correct_answer? answer
        answer == self.correct_answer
    end
end
