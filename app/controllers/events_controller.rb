class EventsController < ApplicationController
  before_action :only_creator_can_edit_event, only: [:edit, :update, :destroy]

  def index
    @events = Event.all
    render :index
  end

  def new
    @event = Event.new
    render :new
  end

  def create
    @event = current_user.events.new(event_params)

    if @event.save
      redirect_to event_url(@event)
    else
      flash.now[:errors] = @event.errors.full_messages
      render :new
    end
  end

  def show
    @event = Event.find(params[:id])
    render :show
  end

  def edit
    @event = Event.find(params[:id])
    render :edit
  end

  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
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
    :address, :city, :state, :date, :start_time, :end_time, category_ids: [])
  end

  def only_creator_can_edit_event
    event = Event.find(params[:id])
    redirect_to event_url(event) unless event.creator == current_user
  end
end
