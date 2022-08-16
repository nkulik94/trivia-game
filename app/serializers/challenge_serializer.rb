class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :stakes, :user_username, :user_record, :user_avatar

  def user_username
    self.object.user.username
  end

  def user_record
    "#{self.object.user.wins} - #{self.object.user.losses}"
  end

  def user_avatar
    self.object.user.avatar_url
  end
end
