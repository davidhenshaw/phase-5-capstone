class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :header, :description, :users, :category, :is_member

  def users
    users = self.object.users.collect do |user|
        UserSerializer.new(user)
    end
  end

  def is_member
    if current_user
      membership = Member.find_by(user_id: current_user.id, project_id: self.object.id)
      !!membership
    end
  end
end
