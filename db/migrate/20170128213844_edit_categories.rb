class EditCategories < ActiveRecord::Migration[5.0]
  def change
    remove_column :categories, :idea_id
    remove_column :categories, :idea_type
  end
end
