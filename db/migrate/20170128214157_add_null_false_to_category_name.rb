class AddNullFalseToCategoryName < ActiveRecord::Migration[5.0]
  def change
    change_column :categories, :name, :string, null: false
  end
end
