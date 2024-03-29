class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.new(user_params)
    if user.save!
      session[:current_user] = user.id
      redirect_to '/'
    else
      flash[:error] = user
      render "new"
    end
  end

  def show
    if current_user && current_user.id.to_s == params[:id]
      render 'show'
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
