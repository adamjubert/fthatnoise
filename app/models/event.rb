# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  creator_id  :integer          not null
#  title       :string           not null
#  address     :string           not null
#  city        :string           not null
#  state       :string           not null
#  description :text             not null
#  date        :date             not null
#  start_time  :time             not null
#  end_time    :time
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  address2    :string
#  latitude    :float
#  longitude   :float
#

class Event < ActiveRecord::Base
  include Taggable

  validates :address, :city, :state, :start_time, :date, presence: true
  validate :date_not_in_past, :start_time_before_end_time

  geocoded_by :full_street_address
  after_validation :geocode

  def self.upcoming
    self.where("date >= ?", Date.today)
  end

  def self.past
    self.where("date < ?", Date.today)
  end

  def self.by_state(state)
    self.where(state: state).order("created_at DESC")
  end

  def self.by_city_and_state(city, state)
    self.where(state: state, city: city).order("created_at DESC")
  end

  def self.order_by_recent_upvotes
    self.select("events.*, COUNT(upvotes.id) AS upvotes_count")
    .joins(:upvotes)
    .where("upvotes.created_at > ?", 1.day.ago)
    .group(:idea_id, "events.id")
    .order("upvotes_count DESC")
  end

  def in_past?
    date < Date.today
  end

  def formatted_date
    date.strftime("%A, %B %d, %Y")
  end

  def formatted_location
    "#{address}, #{city}, #{state}"
  end

  def formatted_time_range
    if end_time
      "#{formatted_start_time} - #{formatted_end_time}"
    else
      formatted_start_time
    end
  end

  def formatted_start_time
    start_time.strftime("%-I:%M %P")
  end

  def formatted_end_time
    end_time.strftime("%-I:%M %P")
  end

  def parse_start_time
    start_time.strftime("%H:%M")
  end

  def parse_end_time
    end_time.strftime("%H:%M")
  end

  private

  def date_not_in_past
    if date && date < Date.today
      errors[:date] << "cannot be in the past"
    end
  end

  def start_time_before_end_time
    if end_time && start_time && end_time < start_time
      errors[:start_time] << "cannot be after end time"
    end
  end

  def full_street_address
    [address, city, state, "US"].compact.join(", ")
  end
end
