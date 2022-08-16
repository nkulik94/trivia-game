class Game < ApplicationRecord
    validates :player_2_contribution, comparison: { equal_to: :player_1_contribution }, if: :player_2_contribution

    belongs_to :player_1, class_name: 'User', foreign_key: :user_id
    belongs_to :player_2, class_name: 'User', foreign_key: :player_2_id, optional: true

    def over?
        pool == 0
    end
end
