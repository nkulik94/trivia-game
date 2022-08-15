class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :pool
      t.integer :user_id
      t.integer :player_2_id
      t.boolean :is_buzzed, :default => false
      t.string :buzzed_by
      t.string :turn

      t.timestamps
    end
  end
end
