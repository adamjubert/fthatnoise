class CreateSignups < ActiveRecord::Migration[5.0]
  def change
    create_table :signups do |t|
      t.integer :user_id, null: false
      t.integer :idea_id, null: false
      t.string :idea_type, null: false

      t.timestamps
    end

    add_index :signups, :user_id
    add_index :signups, [:idea_id, :idea_type]
  end
end
