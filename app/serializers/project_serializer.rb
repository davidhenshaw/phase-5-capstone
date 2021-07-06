class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :header, :description, :members, :category, :is_member

  def members
    members = self.object.members.collect do |member|
        MemberSerializer.new(member)
    end
  end

  def is_member
    if current_user
      membership = Member.find_by(user_id: current_user.id, project_id: self.object.id)
      !!membership
    end
  end
end
