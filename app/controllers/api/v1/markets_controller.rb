class Api::V1::MarketsController < ApplicationController
  def index
    @markets = Market.all
    render json: @markets
  end

  def show
    @markets = Market.find_by(id: params[:id])
    render json: @markets
  end

  private

  def market_params
    
  end
end