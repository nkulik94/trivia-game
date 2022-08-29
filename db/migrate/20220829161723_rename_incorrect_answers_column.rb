class RenameIncorrectAnswersColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :questions, :incorrect_answers, :all_answers_string
  end
end
