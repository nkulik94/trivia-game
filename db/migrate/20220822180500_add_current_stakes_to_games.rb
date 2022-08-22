class AddCurrentStakesToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :current_stakes, :integer
  end
end
