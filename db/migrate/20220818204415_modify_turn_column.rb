class ModifyTurnColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :turn
    add_column :games, :player_1_turn, :boolean
  end
end
