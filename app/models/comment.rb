# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  idea_id    :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  idea_type  :string           not null
#

class Comment < ActiveRecord::Base
  validates :idea, :idea_type, :user, presence: true

  belongs_to :idea, polymorphic: true
  belongs_to :user

  def author_name
    user.username
  end

  def time_string
    "#{created_at.in_time_zone("EST").strftime("%b %d %-I:%M %P")} EST"
  end
end
