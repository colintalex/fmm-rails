class Market < ApplicationRecord
  has_many :favorites
  has_many :markets, through: :favorites

  belongs_to :state
end
