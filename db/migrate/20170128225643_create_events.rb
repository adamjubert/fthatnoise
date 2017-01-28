class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.integer :creator_id, null: false
      t.string :title, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.text :description, null: false
      t.date :date, null: false
      t.time :start_time, null: false
      t.time :end_time

      t.timestamps
    end

    add_index :events, :creator_id
  end
end
