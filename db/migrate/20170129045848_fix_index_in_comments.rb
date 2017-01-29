class FixIndexInComments < ActiveRecord::Migration[5.0]
  def change
    add_index :comments, [:idea_id, :idea_type]
  end
end
