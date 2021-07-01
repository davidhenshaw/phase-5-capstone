class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :display_name
      t.binary :avatar
      t.text :bio
      
      t.string :email
      t.string :twitter_name
      t.string :instagram_name
      t.string :youtube_name

      t.timestamps
    end
  end
end
