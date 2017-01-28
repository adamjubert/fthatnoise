class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.integer :idea_id
      t.string :idea_type

      t.timestamps
    end

    add_index :categories, [:idea_id, :idea_type]
  end
end
