class Admin < ApplicationRecord
    validates :username, uniqueness: true
end
