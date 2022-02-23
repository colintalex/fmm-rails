class ApplicationController < ActionController::Base
  helper_method :current_user, :method2
  private
  def method2
    require 'pry'; binding.pry
  end
  def current_user
    @current_user ||= session[:current_user] &&
    User.find_by(id: session[:current_user])
  end
end
