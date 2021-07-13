# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'base64'
require 'faker'

# puts "Encoding asset files..."
# imgs = ["admiral.png", "dog.png", "eminem_face.png"]
# encodedImgs = []

# # populate the encodedImgs array with each image encoded to base64
# imgs.each do |img|
#     # generate absolute path to the image asset 
#     # otherwise I'd have to enter the entire absolute path for every image
#     path = File.join(File.dirname(__FILE__), "/assets/#{img}")

#     # encode the image to base64 and put into array
#     encodedImgs << Base64.encode64(File.open(path, 'rb').read)
# end

# puts "Clearing existing data..."
# User.destroy_all

# puts "Inserting data..."
# user = User.create(username: "David", avatar:encodedImgs[0]);
# user2 = User.create(username: "Rowland", avatar:encodedImgs[1]);
# user3 = User.create(username: "Declan", avatar:encodedImgs[2]);

# puts "Done."

prng = Random.new

# Configs
num_users = 5
post_per_user = 2
num_categories = 5
num_projects = 5
#################
users = []
categories = []
projects = []
members = []

puts "Clearing existing data..."
Category.destroy_all
Project.destroy_all
Member.destroy_all
User.destroy_all
Post.destroy_all

puts "Generating users..."
passwords = ["wordpass", "asswordpay", "wordymcpass", "paswad", "motdepasse"]

num_users.times do |i|
    display_name = Faker::Name.name
    first_name = display_name.split(/[ -.]/).first
    last_name = display_name.split(/[ -.]/).last
    
    username = Faker::Internet.user_name(display_name, %w(. _ -) )
    password = "admin"
    email = Faker::Internet.safe_email(first_name)

    user = User.create!(display_name: display_name, username: username, password: password, email: email)
    users << user;
end

puts "Generating posts..."
num_users.times do |i|
    post_params = {
        user_id: users[i].id,
        header: "Test",
        message: "This is a message.\nA test message."
    }

    post = Post.create!(post_params)
end

puts "Generating categories..."
5.times do |i|
    name = Faker::SlackEmoji.activity
    name.gsub!(/:/, "") # Remove the : at the beginning and end of emoji name
    name.gsub!(/[_-]/, " ") #Replace underscores and dashes with spaces
    name.capitalize!
    category = Category.create(name: name)
    categories << category
end

puts "Generating projects..."
num_projects.times do |i|
    project_params = {
        category_id: categories[prng.rand(num_categories)].id,
        name: Faker::App.name,
        description: Faker::Hipster.paragraph(2)       
    }

    project = Project.create!(project_params)
    projects << project
end

puts "Populating projects with a member..."
num_projects.times do |i|
    random_user = users[prng.rand(num_users)]
    member_params = {
        user_id: random_user.id,
        project_id: projects[i].id,
    }

    member = Member.create!(member_params)
    members << member
end
puts "Done."
