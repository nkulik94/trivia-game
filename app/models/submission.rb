class Submission < ApplicationRecord
    belongs_to :user
    has_many :upvotes
    validates :question, presence: true
    validates :answer, presence: true
end
