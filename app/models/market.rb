class Market < ApplicationRecord
  has_many :favorites
  has_many :markets, through: :favorites

  belongs_to :state
  
  def valid_website
    return true if website.length > 6
    return false
  end
end
