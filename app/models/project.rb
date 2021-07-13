class Project < ApplicationRecord
    belongs_to :category
    has_many :members
    has_many :users, through: :members

    def addMember(user_id)
        # byebug
        Member.create(user_id: user_id, project_id: self.id)
    end
end
