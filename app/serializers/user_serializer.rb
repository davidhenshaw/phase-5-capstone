class UserSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :username, :avatar, :email, :twitter_name, :instagram_name, :youtube_name
end
