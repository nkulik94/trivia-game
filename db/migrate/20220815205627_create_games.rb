class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :player_1_contribution
      t.integer :player_2_contribution
      t.integer :player_1_winnings, :default => 0
      t.integer :player_2_winnings, :default => 0
      t.integer :total_pool
      t.integer :user_id
      t.integer :player_2_id
      t.integer :buzzed_by_id
      t.string :turn
      t.integer :passcode

      t.timestamps
    end
  end
end
