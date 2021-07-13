class PostSerializer < ActiveModel::Serializer
  attributes :id, :user, :project, :header, :message

  def user
    user = User.find(self.object.user_id)
    UserSerializer.new(user)
  end
end
