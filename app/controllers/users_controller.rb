class UsersController < ApplicationController
  before_action :cannot_sign_up_when_logged_in, only: [:new, :create]
  before_action :can_only_view_own_profile, only: [:show]
  before_action :can_only_edit_own_profile, only: [:edit, :update, :destroy]
  before_action :only_admin_can_see_index, only: [:index]

  def index
    @users = User.all
    render :index
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      flash[:notice] = ["Welcome to F*** That Noise!"]
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

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password,
    :password_confirmation, :city, :state)
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

  def can_only_edit_own_profile
    user = User.find(params[:id])

    unless user == current_user
      flash[:errors] = ["You cannot mess with someone else's page."]
      redirect_to user_url(current_user)
    end
  end

  def only_admin_can_see_index
    unless admin?
      flash[:errors] = ["Only admins can see the list of all users."]
      redirect_to user_url(current_user)
    end
  end
end
