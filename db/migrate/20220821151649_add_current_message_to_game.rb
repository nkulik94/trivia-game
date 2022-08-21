class AddCurrentMessageToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :message, :string, default: "Starting in..."
  end
end
