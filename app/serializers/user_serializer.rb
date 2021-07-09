class UserSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :username, :email, :twitter_name, :instagram_name, :youtube_name
end
