class UsersController < ApplicationController
  before_action :cannot_sign_up_when_logged_in, only: [:new, :create]
  before_action :can_only_view_own_profile, only: [:show]

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

  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password,
    :password_confirmation, :location)
  end

  def cannot_sign_up_when_logged_in
    redirect_to user_url(current_user) if logged_in?
  end

  def can_only_view_own_profile
    user = User.find(params[:id])

    unless user == current_user
      flash[:errors] = ["You cannot view someone else's page."]
      redirect_to user_url(current_user)
    end
  end
end
