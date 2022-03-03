class Api::V1::FavoritesController < ApplicationController
  def create
    market = Market.find_by(id: params[:market_id])
    if current_user
      existing_fav = current_user.favorites.find_by(market_id: market.id)
      
      if existing_fav.present?
        render json: existing_fav
      else
        fav = current_user.favorites.new(market: market)
        if fav.save!
          render json: fav
        else
          render json: fav.errors.messages
        end
      end
    end
  end
end