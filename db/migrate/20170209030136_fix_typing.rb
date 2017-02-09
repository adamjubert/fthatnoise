class FixTyping < ActiveRecord::Migration[5.0]
  def change
    add_column :upvotes, :status, :string, default: "pending", null: false
  end
end
