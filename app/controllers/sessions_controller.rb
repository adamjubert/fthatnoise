class SessionsController < ApplicationController
  before_action :cannot_log_in_twice, only: [:new, :create]
  before_action :cannot_log_out_when_not_logged_in, only: [:destroy]

  def new
    render :new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      login!(user)
      redirect_to user_url(user)
    else
      flash.now[:errors] = ["Invalid username/password combination. Please try again."]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  private

  def cannot_log_in_twice
    redirect_to user_url(current_user) if logged_in?
  end

  def cannot_log_out_when_not_logged_in
    redirect_to new_session_url unless logged_in?
  end
end
