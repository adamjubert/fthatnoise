class Api::UpvotesController < ApplicationController
  # before_action :go_back_unless_logged_in
  # before_action :only_destroy_own_upvotes, only: [:destroy]

  def create
    return if !logged_in?

    current_user.upvotes.create(upvote_params)
  end

  def destroy
    return if !logged_in?

    @upvote = Upvote.find(params[:id])
    @upvote.destroy
  end

  private

  def upvote_params
    params.require(:upvote).permit(:idea_id, :idea_type, :status)
  end

  def can_only_upvote_once
    # IMPLEMENT ME
  end
  # def go_back_unless_logged_in
  #   unless logged_in?
  #     flash[:errors] = ["Please sign in or sign up to commit to something!"]
  #     redirect_to :back
  #   end
  # end
  #
  # def only_destroy_own_upvotes
  #   upvote = Upvote.find(params[:id])
  #   unless upvote.user == current_user
  #     flash[:errors] = ["You can't say 'Never mind' as someone else!"]
  #     redirect_to :back
  #   end
  # end
end
