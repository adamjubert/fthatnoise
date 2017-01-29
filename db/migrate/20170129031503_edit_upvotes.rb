class EditUpvotes < ActiveRecord::Migration[5.0]
  def change
    remove_column :upvotes, :creator_id
    add_column :upvotes, :user_id, :integer, null: false
  end
end
