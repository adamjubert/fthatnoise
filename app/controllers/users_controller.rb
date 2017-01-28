class UsersController < ApplicationController
  before_action :cannot_sign_up_when_logged_in, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password,
    :password_confirmation, :location)
  end

  def cannot_sign_up_when_logged_in
    redirect_to user_url(current_user) if logged_in?
  end
end
