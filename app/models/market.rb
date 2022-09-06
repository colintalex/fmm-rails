class Market < ApplicationRecord
  has_many :favorites
  has_many :markets, through: :favorites

  belongs_to :state
  
  def valid_website
    website.present? && website.length > 6
  end
end
