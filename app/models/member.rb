class Member < ApplicationRecord
    belongs_to :user
    belongs_to :project
    #belongs_to :role

    # User cannot be added to the same group twice
    validate :user_is_unique_member


    def user_is_unique_member
        #byebug
        unless Member.where(user_id: user_id, project_id: project_id).blank?
            project = Project.find(project_id)
            user = User.find(user_id)
            errors.add(:user_id, "#{user.username} is already a member of #{project.name}")
        end
    end

end
