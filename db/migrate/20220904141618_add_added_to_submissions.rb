class AddAddedToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :added, :boolean, default: false
  end
end
