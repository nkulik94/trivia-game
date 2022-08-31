class AddDefaultToSubmissionApproved < ActiveRecord::Migration[7.0]
  def change
    change_column :submissions, :approved, :boolean, default: false
  end
end
