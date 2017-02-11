class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :admin?

  private

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def admin?
    current_user && current_user.admin
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password,
    :password_confirmation, :zip_code)
  end

  def redirect_unless_logged_in
    unless logged_in?
      flash[:errors] = ["Please sign in or sign up to do this!"]
      redirect_to new_session_url
    end
  end
end
