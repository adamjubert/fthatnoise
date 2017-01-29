class CreateUpvotes < ActiveRecord::Migration[5.0]
  def change
    create_table :upvotes do |t|
      t.integer :creator_id
      t.integer :idea_id
      t.string :idea_type

      t.timestamps
    end

    add_index :upvotes, [:idea_type, :idea_id]
  end
end
