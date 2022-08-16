class AddRecordToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :wins, :integer, default: 0
    add_column :users, :losses, :integer, default: 0
  end
end
