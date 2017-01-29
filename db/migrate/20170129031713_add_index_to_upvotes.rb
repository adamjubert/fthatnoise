class AddIndexToUpvotes < ActiveRecord::Migration[5.0]
  def change
    add_index :upvotes, :user_id
  end
end
