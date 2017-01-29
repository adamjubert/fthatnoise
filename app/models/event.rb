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
#

class Event < ActiveRecord::Base
  include Taggable

  validates :creator, :title, :address, :city, :state, :start_time, :date, presence: true
  validate :date_not_in_past, :start_time_before_end_time

  def category_ids=(ids)
    ids = ids.reject(&:blank?).map(&:to_i)
    super(ids)
  end

  def formatted_date
    date.strftime("%A, %B %d, %Y")
  end

  def formatted_start_time
    start_time.strftime("%-I:%M %P")
  end

  def formatted_end_time
    end_time.strftime("%-I:%M %P")
  end

  private

  def date_not_in_past
    if date < Date.today
      errors[:date] << "cannot be in the past"
    end
  end

  def start_time_before_end_time
    if end_time && end_time < start_time
      errors[:start_time] << "cannot be after end time"
    end
  end
end
