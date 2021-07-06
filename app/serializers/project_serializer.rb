class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :header, :description, :users, :category

  def users
    users = self.object.users.collect do |user|
        UserSerializer.new(user)
    end
  end
end
