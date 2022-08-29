class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :points, :avatar_url
end
