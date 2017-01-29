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

  belongs_to :creator,
    class_name: "User",
    primary_key: :id,
    foreign_key: :creator_id
end
