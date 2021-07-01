class UserSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :username, :email
end
