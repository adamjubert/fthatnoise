class ChangeAFewThings < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :city
    remove_column :users, :state
    add_column :users, :zip_code, :string
    add_column :events, :address2, :string
    add_column :events, :latitude, :float
    add_column :events, :longitude, :float
  end
end
