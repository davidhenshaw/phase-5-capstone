class PostSerializer < ActiveModel::Serializer
  attributes :id, :project, :header, :message
end
