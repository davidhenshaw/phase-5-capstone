class Project < ApplicationRecord
    belongs_to :category
    has_many :members
    has_many :users, through: :members
end
