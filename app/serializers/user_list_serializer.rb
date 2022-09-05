class UserListSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :points, :avatar_url, :wins, :losses
end
