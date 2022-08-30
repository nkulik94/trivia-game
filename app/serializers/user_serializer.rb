class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :points, :avatar_url, :record

  def record
    "#{self.object.wins} - #{self.object.losses}"
  end

  has_many :submissions
end
