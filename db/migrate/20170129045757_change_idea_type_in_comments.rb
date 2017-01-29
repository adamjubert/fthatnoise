class ChangeIdeaTypeInComments < ActiveRecord::Migration[5.0]
  def change
    remove_column :comments, :idea_type
    add_column :comments, :idea_type, :string, null: false
  end
end
