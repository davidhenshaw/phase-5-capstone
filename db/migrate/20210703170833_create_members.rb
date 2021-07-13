class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.integer :user_id
      t.integer :project_id
      t.integer :role_id
      t.timestamps
    end
  end
end
