class ChangeGameColumns < ActiveRecord::Migration[7.0]
  def change
    rename_column :games, :player_1_contribution, :stakes
    rename_column :games, :total_pool, :pool
    remove_column :games, :player_2_contribution
  end
end
