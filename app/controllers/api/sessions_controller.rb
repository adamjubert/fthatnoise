class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login!(@user)
      @upvotes = Upvote.where(user_id: params[:id]).includes(idea: [:categories, :creator, :upvotes])
      render 'api/users/show'
    else
      render json: ["Invalid username and password combination! Please try again :)"], status: 422
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: {}
    else
      render json: ["You are not even logged in!"], status: 404
    end
  end
end
