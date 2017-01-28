class RenameActions < ActiveRecord::Migration[5.0]
  def self.up
    rename_table :actions, :suggestions
  end

  def self.down
    rename_table :suggestions, :actions
  end
end
