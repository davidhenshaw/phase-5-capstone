# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

puts "Clearing existing data..."
User.destroy_all

puts "Generating users..."
passwords = ["wordpass", "asswordpay", "wordymcpass", "paswad", "motdepasse"]

5.times do |i|
    display_name = Faker::Name.name
    first_name = display_name.split(/[ -.]/).first
    last_name = display_name.split(/[ -.]/).last
    
    username = Faker::Internet.user_name(display_name, %w(. _ -) )
    password = "admin"
    email = Faker::Internet.safe_email(first_name)

    user = User.create(display_name: display_name, username: username, password_digest: password, email: email)
end

puts "Done."
