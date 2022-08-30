class User < ApplicationRecord
    has_secure_password
    has_many :games
    has_many :submissions
    has_one :challenge

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
    validates :username, presence: true, uniqueness: true
end
