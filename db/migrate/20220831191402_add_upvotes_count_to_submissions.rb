class AddUpvotesCountToSubmissions < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :upvotes_count, :integer, default: 0
  end
end
