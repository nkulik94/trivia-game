class AddAwaitingFormToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :awaiting_form, :boolean, default: false
  end
end
