class AddIndicesToIdeaCategories < ActiveRecord::Migration[5.0]
  def change
    add_index :idea_categories, [:idea_id, :idea_type]
    add_index :idea_categories, :category_id
  end
end
