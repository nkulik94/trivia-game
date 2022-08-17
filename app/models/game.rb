class Game < ApplicationRecord
    belongs_to :player_1, class_name: 'User', foreign_key: :player_1_id
    belongs_to :player_2, class_name: 'User', foreign_key: :user_id

    def over?
        pool == 0
    end
end
