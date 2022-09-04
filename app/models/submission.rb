class Submission < ApplicationRecord
    belongs_to :user
    has_many :upvotes
    validates :question, presence: true
    validates :answer, presence: true

    def handle_added
        user = User.find(self.user.id)
        user.update(points: user.points + 100)
        self.update(added: true)
    end
end
