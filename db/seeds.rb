# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'base64'

puts "Encoding asset files..."
imgs = ["admiral.png", "dog.png", "eminem_face.png"]
encodedImgs = []

# populate the encodedImgs array with each image encoded to base64
imgs.each do |img|
    # generate absolute path to the image asset 
    # otherwise I'd have to enter the entire absolute path for every image
    path = File.join(File.dirname(__FILE__), "/assets/#{img}")

    # encode the image to base64 and put into array
    encodedImgs << Base64.encode64(File.open(path, 'rb').read)
end

puts "Clearing existing data..."
User.destroy_all

puts "Inserting data..."
user = User.create(username: "David", avatar:encodedImgs[0]);
user2 = User.create(username: "Rowland", avatar:encodedImgs[1]);
user3 = User.create(username: "Declan", avatar:encodedImgs[2]);

puts "Done."