class Api::V1::MarketsController < ApplicationController
  def index
    @markets = Market.all
    render json: @markets
  end

  def show
    @markets = Market.find_by(fmid: params[:fmid])
    render json: @markets
  end

  private

  def market_params
    
  end
end