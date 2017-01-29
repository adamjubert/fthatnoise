class SuggestionsController < ApplicationController
  before_action :only_creator_can_edit_suggestion, only: [:edit, :update, :destroy]

  def index
    @suggestions = Suggestion.all
    render :index
  end

  def new
    @suggestion = Suggestion.new
    render :new
  end

  def create
    @suggestion = current_user.suggestions.new(suggestion_params)

    if @suggestion.save
      # params[:suggestion][:category_ids].each do |category_id|
      #   next if category_id.blank?
      #   @suggestion.idea_categories.create(category_id: category_id.to_i)
      # end

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
    # fail
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
    params.require(:suggestion).permit(:title, :description)
  end

  def only_creator_can_edit_suggestion
    suggestion = Suggestion.find(params[:id])
    redirect_to suggestion_url(suggestion) unless suggestion.creator == current_user
  end
end
