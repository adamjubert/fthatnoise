class StaticPagesController < ApplicationController
  def about
    render :about
  end

  def root
    render :root
  end
end
