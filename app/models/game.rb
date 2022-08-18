class Game < ApplicationRecord
    belongs_to :player_1, class_name: 'User', foreign_key: :user_id
    belongs_to :player_2, class_name: 'User', foreign_key: :player_2_id
    has_and_belongs_to_many :questions

    def over?
        pool == 0
    end
end
