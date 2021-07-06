class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :header, :description, :members, :category
end
