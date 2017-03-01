class Api::SuggestionsController < ApplicationController
  before_action :only_creator_can_edit_suggestion, only: [:update, :destroy]
  before_action :redirect_unless_logged_in, only: [:create, :update, :destroy]

  def index
    @suggestions = Suggestion.order_by_created_at
    render :index
  end

  def show
    @suggestion = Suggestion.includes(:creator, :categories, :upvotes, { comments: :user })
    .find(params[:id])
    render :show
  end

  def create
    @suggestion = current_user.suggestions.new(suggestion_params)

    if @suggestion.save
      current_user.upvotes.create(idea_id: @suggestion.id, idea_type: "Suggestion", status: "complete")
      render :show
    else
      render json: @suggestion.errors.full_messages, status: 422
    end
  end

  def update
    @suggestion = Suggestion.find(params[:id])

    if @suggestion.update(suggestion_params)
      render :show
    else
      render json: @suggestion.errors.full_messages, status: 422
    end
  end

  def pending_upvote
    upvote("pending")
  end

  def ignore_upvote
    upvote("ignore")
  end

  def complete_upvote
    upvote("complete")
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

  def upvote(status)
    @suggestion = Suggestion.find(params[:suggestion_id])

    upvote = current_user.upvotes.find_or_initialize_by(idea_type: "Suggestion", idea_id: @suggestion.id)
    upvote.status = status
    if upvote.save
      render :show
    else
      render json: upvote.errors.full_messages, status: 422
    end
  end

  def suggestion_params
    params.require(:suggestion).permit(:title, :description, category_ids: [])
  end

  def only_creator_can_edit_suggestion
    suggestion = Suggestion.find(params[:id])
    unless suggestion.creator == current_user
      render json: ["You cannot edit someone else's action!"], status: 422
    end
  end
end
