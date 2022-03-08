class Api::V1::MarketsController < ApplicationController
  def index
    @markets = Market.all
    render json: @markets
  end

  def show
    @market = Market.find_by(id: params[:id])
    render json: @market
    # respond_to :html
  end

  private

  def market_params
    
  end
end