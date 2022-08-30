class CreateSubmissions < ActiveRecord::Migration[7.0]
  def change
    create_table :submissions do |t|
      t.integer :user_id
      t.string :question
      t.string :answer
      t.boolean :reviewed, default: false
      t.boolean :approved

      t.timestamps
    end
  end
end
