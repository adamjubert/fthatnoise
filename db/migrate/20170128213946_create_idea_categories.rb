class CreateIdeaCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :idea_categories do |t|
      t.integer :idea_id, null: false
      t.string :idea_type, null: false
      t.integer :category_id, null: false

      t.timestamps
    end
  end
end
