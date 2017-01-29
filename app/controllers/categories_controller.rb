class CategoriesController < ApplicationController
  before_action :only_admin_can_create_categories, only: [:new, :create]

  def new
    @category = Category.new
    render :new
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      flash[:notice] = ["Successfully created category!"]
      redirect_to category_url(@category)
    else
      flash.now[:errors] = @category.errors.full_messages
      render :new
    end
  end

  def index
    @categories = Category.all
    render :index
  end

  def show
    @category = Category.find(params[:id])
    render :show
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def only_admin_can_create_categories
    redirect_to categories_url unless admin?
  end
end
