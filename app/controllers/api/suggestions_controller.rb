class Api::SuggestionsController < ApplicationController
  # before_action :only_creator_can_edit_suggestion, only: [:edit, :update, :destroy]
  # before_action :redirect_unless_logged_in, only: [:new, :create, :edit, :update, :destroy]

  def index
    @suggestions = Suggestion.order_by_created_at
    render :index
  end

  def show
    @suggestion = Suggestion.includes(:creator, :categories, :upvotes, { comments: :user })
    .find(params[:id])
    # @comments = Comment.includes(:user).where("idea_type = ? AND idea_id = ?",
    # "Suggestion", params[:id])
    render :show
  end

  def create
    if !logged_in?
      render json: ["Please sign up or sign in to create an action"], status: 422
    else
      @suggestion = current_user.suggestions.new(suggestion_params)
      if @suggestion.save
        render :show
      else
        render json: @suggestion.errors.full_messages, status: 422
      end
    end
  end

  def update
    @suggestion = Suggestion.find(params[:id])

    if @suggestion.creator != current_user
      render json: ["You cannot edit someone else's action!"], status: 422
    elsif @suggestion.update(suggestion_params)
      render :show
    else
      render json: @suggestion.errors.full_messages, status: 422
    end
  end

  # def most_upvoted
  #   @ideas = Suggestion.order_by_upvotes
  #   render :most_upvoted
  # end
  #
  # def trending
  #   @ideas = Suggestion.order_by_recent_upvotes.paginate(:page => params[:page], per_page: 30)
  #   render :trending
  # end
  #
  # def new
  #   @suggestion = Suggestion.new
  #   render :new
  # end
  #
  # def create
  #   @suggestion = current_user.suggestions.new(suggestion_params)
  #
  #   if @suggestion.save
  #     Upvote.create(idea_id: @suggestion.id, idea_type: "Suggestion", user: current_user)
  #     flash[:notice] = ["Action successfully created!"]
  #     redirect_to suggestion_url(@suggestion)
  #   else
  #     flash.now[:errors] = @suggestion.errors.full_messages
  #     render :new
  #   end
  # end
  #
  # def show
  #   @suggestion = Suggestion.find_with_upvotes(params[:id])
  #   render :show
  # end
  #
  # def edit
  #   @suggestion = Suggestion.find(params[:id])
  #   render :edit
  # end
  #
  # def update
  #   @suggestion = Suggestion.find(params[:id])
  #
  #   if @suggestion.update(suggestion_params)
  #     flash[:notice] = ["Action successfully updated!"]
  #     redirect_to suggestion_url(@suggestion)
  #   else
  #     flash.now[:errors] = @suggestion.errors.full_messages
  #     render :edit
  #   end
  # end
  #
  # def destroy
  #   @suggestion = Suggestion.find(params[:id])
  #   @suggestion.destroy
  #   redirect_to suggestions_url
  # end
  #
  private

  def suggestion_params
    params.require(:suggestion).permit(:title, :description, category_ids: [])
  end
  #
  # def only_creator_can_edit_suggestion
  #   suggestion = Suggestion.find(params[:id])
  #   redirect_to suggestion_url(suggestion) unless suggestion.creator == current_user
  # end
end
