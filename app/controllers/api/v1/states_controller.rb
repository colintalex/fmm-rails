class Api::V1::StatesController < ApplicationController
  def markets
    @state = State.find_by(name: params[:stateName].downcase)
    puts @state.name
    render json: @state.markets
  end
end
