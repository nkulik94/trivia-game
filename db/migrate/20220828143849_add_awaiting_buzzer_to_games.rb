class AddAwaitingBuzzerToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :awaiting_buzzer, :boolean, default: false
  end
end
