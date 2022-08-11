class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :category
      t.string :difficulty
      t.string :question
      t.string :correct_answer
      t.string :incorrect_answers

      t.timestamps
    end
  end
end
