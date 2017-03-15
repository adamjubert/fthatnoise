class Api::UsersController < ApplicationController
  before_action :must_log_in_to_see_profile, only: [:profile]

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
        @upvotes = Upvote.includes(suggestion: [:categories, :creator, :upvotes])
        .where(user_id: current_user.id)
        .where(status: "complete")
        .where(suggestions: { creator: current_user } )
      elsif params[:actions] == "completed"
        @upvotes = Upvote.includes(suggestion: [:categories, :creator, :upvotes])
        .where(user_id: current_user.id)
        .where(status: "complete")
        .where.not(suggestions: { creator: current_user } )
      else
        @upvotes = Upvote.where(user_id: current_user.id)
        .where(idea_type: "Suggestion")
        .where(status: "pending")
        .includes(idea: [:categories, :creator, :upvotes])
      end
    else
      if params[:events] == "mine"
        @upvotes = Upvote.includes(event: [:categories, :creator, :upvotes])
        .where(user_id: current_user.id)
        .where(status: "complete")
        .where(events: { creator: current_user } )
      elsif params[:events] == "completed"
        @upvotes = Upvote.includes(event: [:categories, :creator, :upvotes])
        .where(user_id: current_user.id)
        .where.not(events: { creator: current_user } )
        .where.not(status: "ignore")
        .where("events.date < ?", Date.today)
      else
        @upvotes = Upvote.includes(event: [:categories, :creator, :upvotes])
        .where(user_id: current_user.id)
        .where.not(events: { creator: current_user } )
        .where.not(status: "ignore")
        .where("events.date > ?", Date.today)
      end
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
end
