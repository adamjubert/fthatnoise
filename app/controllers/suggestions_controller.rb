class SuggestionsController < ApplicationController
  before_action :only_creator_can_edit_suggestion, only: [:edit, :update, :destroy]
  before_action :redirect_unless_logged_in, only: [:new, :create, :edit, :update, :destroy]

  def index
    @suggestions = Suggestion.all
    @events = Event.all
    render :index
  end

  def new
    @suggestion = Suggestion.new
    render :new
  end

  def create
    @suggestion = current_user.suggestions.new(suggestion_params)

    if @suggestion.save
      redirect_to suggestion_url(@suggestion)
    else
      flash.now[:errors] = @suggestion.errors.full_messages
      render :new
    end
  end

  def show
    @suggestion = Suggestion.find(params[:id])
    render :show
  end

  def edit
    @suggestion = Suggestion.find(params[:id])
    render :edit
  end

  def update
    @suggestion = Suggestion.find(params[:id])

    if @suggestion.update(suggestion_params)
      redirect_to suggestion_url(@suggestion)
    else
      flash.now[:errors] = @suggestion.errors.full_messages
      render :edit
    end
  end

  def destroy
    @suggestion = Suggestion.find(params[:id])
    @suggestion.destroy
    redirect_to suggestions_url
  end

  private

  def suggestion_params
    params.require(:suggestion).permit(:title, :description, category_ids: [])
  end

  def only_creator_can_edit_suggestion
    suggestion = Suggestion.find(params[:id])
    redirect_to suggestion_url(suggestion) unless suggestion.creator == current_user
  end
end
