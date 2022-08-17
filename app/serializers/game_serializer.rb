class GameSerializer < ActiveModel::Serializer
  attributes :id, :stakes, :player_1_winnings, :player_2_winnings, :pool, :buzzed_by_id, :turn

  belongs_to :player_1
  belongs_to :player_2
end
