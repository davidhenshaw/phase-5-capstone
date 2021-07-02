class PostSerializer < ActiveModel::Serializer
  attributes :id, :user, :project, :header, :message
end
