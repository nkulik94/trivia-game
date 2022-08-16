class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :stakes, :user_username, :user_record

  def user_username
    self.object.user.username
  end

  def user_record
    "#{self.object.user.wins} - #{self.object.user.losses}"
  end
end
