class UpvotesController < ApplicationController
  before_action :go_back_unless_logged_in
  before_action :only_destroy_own_upvotes, only: [:destroy]

  def create
    if params[:suggestion_id]
      current_user.upvotes.create(idea_id: params[:suggestion_id], idea_type: "Suggestion")
    elsif params[:event_id]
      current_user.upvotes.create(idea_id: params[:event_id], idea_type: "Event")
    end

    redirect_to :back
  end

  def destroy
    @upvote = Upvote.find(params[:id])
    @upvote.destroy
    redirect_to :back
  end

  private

  def go_back_unless_logged_in
    unless logged_in?
      flash[:errors] = ["Please sign in or sign up to commit to something!"]
      redirect_to :back
    end
  end

  def only_destroy_own_upvotes
    upvote = Upvote.find(params[:id])
    unless upvote.user == current_user
      flash[:errors] = ["You can't say 'Never mind' as someone else!"]
      redirect_to :back
    end
  end
end
