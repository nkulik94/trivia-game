class Challenge < ApplicationRecord
    validates :stakes, numericality: true
    validates :stakes, comparison: { less_than_or_equal_to: :user_points }
    belongs_to :user

    def user_points
        self.user.points
    end
end
