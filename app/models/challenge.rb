class Challenge < ApplicationRecord
    validates :stakes, numericality: true
    belongs_to :user
end
