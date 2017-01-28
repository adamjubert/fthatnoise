class CreateActions < ActiveRecord::Migration[5.0]
  def change
    create_table :actions do |t|
      t.integer :creator_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      
      t.timestamps
    end

    add_index :actions, :creator_id
  end
end
