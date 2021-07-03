class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.integer :category_id
      t.string :name
      t.string :header
      t.text :description
      t.string :status
      t.string :banner_image
      t.timestamps
    end
  end
end
