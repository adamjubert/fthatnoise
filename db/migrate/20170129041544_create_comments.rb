class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :idea_id, null: false
      t.integer :idea_type, null: false
      t.text :body, null: false
      
      t.timestamps
    end

    add_index :comments, :user_id
    add_index :comments, [:idea_id, :idea_type]

    drop_table :signups
  end
end
