class Api::EventsController < ApplicationController
  before_action :only_creator_can_edit_event, only: [:update, :destroy]
  before_action :redirect_unless_logged_in, only: [:create, :update, :destroy, :near_me]

  def index
    @events = Event.order_by_created_at

    if params[:category]
      @events = Event.find_by_category(params[:category])
    else
      @events = Event.order_by_created_at
    end

    render :index
  end

  def show
    @event = Event.includes(:categories, :upvotes, { comments: :user })
    .find(params[:id])
    render :show
  end

  def create
    @event = current_user.events.new(event_params)

    if @event.save
      current_user.upvotes.create(idea_id: @event.id, idea_type: "Event", status: "complete")
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def pending_upvote
    upvote("pending")
  end

  def ignore_upvote
    upvote("ignore")
  end

  def complete_upvote
    upvote("complete")
  end
  #
  # def near_me
  #   @ideas = Event.by_city_and_state(current_user.city, current_user.state)
  #
  #   if @ideas.empty?
  #     @ideas = Event.by_state(current_user.state)
  #   end
  #
  #   @ideas = @ideas.paginate(:page => params[:page], per_page: 30).order('created_at DESC')
  #
  #   render :near_me
  # end
  #
  # def most_upvoted
  #   @ideas = Event.order_by_upvotes
  #   render :most_upvoted
  # end
  #
  # def trending
  #   @ideas = Event.order_by_recent_upvotes.paginate(:page => params[:page], per_page: 30)
  #   render :trending
  # end
  #
  # def new
  #   @event = Event.new
  #   render :new
  # end
  #
  # def create
  #   @event = current_user.events.new(event_params)
  #
  #   if @event.save
  #     flash[:notice] = ["Event successfully created!"]
  #     Upvote.create(idea_id: @event.id, idea_type: "Event", user: current_user)
  #     redirect_to event_url(@event)
  #   else
  #     flash.now[:errors] = @event.errors.full_messages
  #     render :new
  #   end
  # end
  #
  # def show
  #   @event = Event.find_with_upvotes(params[:id])
  #   render :show
  # end
  #
  # def edit
  #   @event = Event.find(params[:id])
  #   render :edit
  # end
  #
  # def update
  #   @event = Event.find(params[:id])
  #
  #   if @event.update(event_params)
  #     flash[:notice] = ["Event successfully updated!"]
  #     redirect_to event_url(@event)
  #   else
  #     flash.now[:errors] = @event.errors.full_messages
  #     render :edit
  #   end
  # end
  #
  # def destroy
  #   @event = Event.find(params[:id])
  #   @event.destroy
  #   redirect_to events_url
  # end
  #
  private
  def upvote(status)
    @event = Event.find(params[:event_id])
    upvote = current_user.upvotes.find_or_initialize_by(idea_type: "Event", idea_id: @event.id)
    upvote.status = status
    if upvote.save
      render :show
    else
      render json: upvote.errors.full_messages, status: 422
    end
  end

  def event_params
    params.require(:event).permit(:title, :description,
    :address, :address2, :city, :state, :date, :start_time, :end_time, category_ids: [])
  end


  def only_creator_can_edit_event
    event = Event.find(params[:id])
    unless event.creator == current_user
      render json: ["You cannot edit someone else's action!"], status: 422
    end
  end
end
