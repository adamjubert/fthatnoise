class ChangeZipCodeInUsers < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :zip_code, 'integer USING CAST(zip_code AS integer)'
  end
end
