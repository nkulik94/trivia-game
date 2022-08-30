class CreateUpvotes < ActiveRecord::Migration[7.0]
  def change
    create_table :upvotes do |t|
      t.integer :user_id
      t.integer :submission_id
      
      t.timestamps
    end
  end
end
