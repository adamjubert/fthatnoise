class AddSessionTokenToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :session_token, :string, null: false
  end
end
