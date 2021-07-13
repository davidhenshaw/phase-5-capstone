class MemberSerializer < ActiveModel::Serializer
  attributes :id, :project_id, :user

  def user
    user = User.find(self.object.user_id)
    UserSerializer.new(user)
  end

end
