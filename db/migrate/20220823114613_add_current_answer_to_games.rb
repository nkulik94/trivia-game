class AddCurrentAnswerToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :current_answer, :string
  end
end
