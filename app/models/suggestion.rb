# == Schema Information
#
# Table name: suggestions
#
#  id          :integer          not null, primary key
#  creator_id  :integer          not null
#  title       :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Suggestion < ActiveRecord::Base
  include Taggable

  validates :creator, :title, :description, presence: true

  def self.order_by_upvotes
    self.select("suggestions.*, COUNT(upvotes.id) AS upvotes_count")
    .joins(:upvotes)
    .group(:idea_id, "suggestions.id")
    .order("upvotes_count DESC")
  end

  def self.order_by_recent_upvotes
    self.select("suggestions.*, COUNT(upvotes.id) AS upvotes_count")
    .joins(:upvotes)
    .where("upvotes.created_at > ?", 1.day.ago)
    .group(:idea_id, "suggestions.id")
    .order("upvotes_count DESC")
  end
end
