class AdditionalColumnMidifications < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :passcode
    rename_column :games, :player_2_id, :player_1_id
  end
end
