class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.boolean :admin, null: false, default: false
      t.string :location

      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
