class EventsController < ApplicationController
  before_action :only_creator_can_edit_event, only: [:edit, :update, :destroy]
  before_action :redirect_unless_logged_in, only: [:new, :create, :edit, :update, :destroy, :near_me]


  def index
    @ideas = Event.order_by_created_at
    render :index
  end

  def near_me
    @ideas = Event.by_city_and_state(current_user.city, current_user.state)

    if @ideas.empty?
      @ideas = Event.by_state(current_user.state)
    end

    @ideas = @ideas.paginate(:page => params[:page], per_page: 30).order('created_at DESC')

    render :near_me
  end

  def most_upvoted
    @ideas = Event.order_by_upvotes
    render :most_upvoted
  end

  def trending
    @ideas = Event.order_by_recent_upvotes.paginate(:page => params[:page], per_page: 30)
    render :trending
  end

  def new
    @event = Event.new
    render :new
  end

  def create
    @event = current_user.events.new(event_params)

    if @event.save
      flash[:notice] = ["Event successfully created!"]
      Upvote.create(idea_id: @event.id, idea_type: "Event", user: current_user)
      redirect_to event_url(@event)
    else
      flash.now[:errors] = @event.errors.full_messages
      render :new
    end
  end

  def show
    @event = Event.find_with_upvotes(params[:id])
    render :show
  end

  def edit
    @event = Event.find(params[:id])
    render :edit
  end

  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      flash[:notice] = ["Event successfully updated!"]
      redirect_to event_url(@event)
    else
      flash.now[:errors] = @event.errors.full_messages
      render :edit
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    redirect_to events_url
  end

  private

  def event_params
    params.require(:event).permit(:title, :description,
    :address, :address2, :city, :state, :date, :start_time, :end_time, category_ids: [])
  end

  def only_creator_can_edit_event
    event = Event.find(params[:id])
    redirect_to event_url(event) unless event.creator == current_user
  end
end
