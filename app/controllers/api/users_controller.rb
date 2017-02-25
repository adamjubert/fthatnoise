class Api::UsersController < ApplicationController
  # before_action :cannot_sign_up_when_logged_in, only: [:new, :create]
  # before_action :can_only_view_own_profile, only: [:show]
  # before_action :can_only_edit_own_profile, only: [:edit, :update, :destroy]
  # before_action :only_admin_can_see_index, only: [:index]
  before_action :must_log_in_to_see_profile, only: [:profile]
  # def index
  #   @users = User.all
  #   render :index
  # end
  #
  # def new
  #   @user = User.new
  #   render :new
  # end
  #
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render partial: 'user', locals: { user: @user }
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  #
  def show
    @upvotes = Upvote.where(user_id: params[:id]).includes(idea: [:categories, :creator, :upvotes])
    @user = User.find(params[:id])
    render :show
  end

  def profile
    if params[:actions]
      if params[:actions] == "mine"
        @upvotes = current_user.suggestions
      elsif params[:actions] == "completed"
        @upvotes = Upvote.where(user_id: current_user.id)
        .where(idea_type: "Suggestion")
        .where(status: "complete")
        .where.not(creator_id: current_user.id)
        .includes(idea: [:categories, :creator, :upvotes])
      else
        @upvotes = Upvote.where(user_id: current_user.id)
        .where(idea_type: "Suggestion")
        .where(status: "pending")
        .includes(idea: [:categories, :creator, :upvotes])
      end
    else
    end

    @user = current_user
    render :profile
  end
  #
  # def edit
  #   @user = User.find(params[:id])
  #   render :edit
  # end
  #
  # def update
  #   @user = User.find(params[:id])
  #
  #   if @user.update(user_params)
  #     redirect_to user_url(@user)
  #   else
  #     flash.now[:errors] = @user.errors.full_messages
  #     render :edit
  #   end
  # end
  #
  private

  def must_log_in_to_see_profile
    unless logged_in?
      render json: ["Please log in to see your profile"], status: 403
    end
  end
  #
  # def cannot_sign_up_when_logged_in
  #   redirect_to user_url(current_user) if logged_in?
  # end
  #
  # def can_only_view_own_profile
  #   user = User.find(params[:id])
  #
  #   unless user == current_user
  #     render json: ["You cannot view someone else's profile"], status: 422
  #   end
  # end
  #
  # def can_only_edit_own_profile
  #   user = User.find(params[:id])
  #
  #   unless user == current_user
  #     flash[:errors] = ["You cannot mess with someone else's page."]
  #     redirect_to user_url(current_user)
  #   end
  # end
  #
  # def only_admin_can_see_index
  #   unless admin?
  #     flash[:errors] = ["Only admins can see the list of all users."]
  #     redirect_to user_url(current_user)
  #   end
  # end
end
