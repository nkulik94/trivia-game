class QuestionsGameJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :games, :questions
  end
end
