class SessionsController < ApplicationController
  def new
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:current_user] = user.id
      flash[:success] = "Page saved"
      redirect_to maps_path
    else
      redirect_to '/login'
    end
  end

  def delete
    reset_session
    redirect_to root_path
  end
end
