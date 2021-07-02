class Post < ApplicationRecord
    belongs_to :user

    def project
        # if a project_id exists,
        # manually find the project with Project.find()
    end
end
