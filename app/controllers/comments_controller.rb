class CommentsController < ApplicationController
  before_action :go_back_unless_logged_in
  before_action :only_destroy_own_comments, only: [:destroy]

  def create
    if params[:suggestion_id]
      @comment = current_user.comments.new(idea_id: params[:suggestion_id], idea_type: "Suggestion",
      body: params[:comment][:body])
    elsif params[:event_id]
      @comment = current_user.comments.new(idea_id: params[:event_id],
      idea_type: "Event", body: params[:comment][:body])
    end

    unless @comment.save
      flash[:errors] = @comment.errors.full_messages
    end

    redirect_to :back
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to :back
  end

  private

  def go_back_unless_logged_in
    unless logged_in?
      flash[:errors] = ["Please sign in or sign up to comment!"]
      redirect_to :back
    end
  end

  def only_destroy_own_comments
    comment = Comment.find(params[:id])
    unless comment.user == current_user
      flash[:errors] = ["You can't delete someone else's comment!"]
      redirect_to :back
    end
  end
end
