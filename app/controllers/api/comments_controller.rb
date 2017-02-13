class Api::CommentsController < ApplicationController
  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      if @comment.idea_type == "Suggestion"
        @suggestion = @comment.idea
        render 'api/suggestions/show'
      else
        @event = @comment.idea
        render 'api/events/show'
      end
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :idea_id, :idea_type)
  end
end
