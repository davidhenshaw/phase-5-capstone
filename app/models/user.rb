class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true

    has_many :posts
    has_many :members
    has_many :projects, through: :members
end
