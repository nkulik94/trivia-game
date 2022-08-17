class ChangeColumnsAgain < ActiveRecord::Migration[7.0]
  def change
    rename_column :games, :player_1_id, :player_2_id
  end
end
