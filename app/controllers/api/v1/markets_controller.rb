class Api::V1::MarketsController < ApplicationController
  def index
    @markets = Market.all
    render json: @markets
  end

  def show
    @market = Market.find_by(id: params[:id])
    render partial: "markets/details", locals: {market: @market}
  end

  private

  def market_params
    
  end
end