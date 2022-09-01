class CreateAdminKeys < ActiveRecord::Migration[7.0]
  def change
    create_table :admin_keys do |t|
      t.string :password_digest

      t.timestamps
    end
  end
end
