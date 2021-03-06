# == Schema Information
#
# Table name: upvotes
#
#  id         :integer          not null, primary key
#  idea_id    :integer
#  idea_type  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#  status     :string           default("pending"), not null
#

class Upvote < ActiveRecord::Base
  STATUSES = %w(pending complete ignore)

  validates :idea, :idea_type, :user, presence: true
  validates :user_id, :uniqueness => { :scope => [:idea_type, :idea_id] }
  validates :status, inclusion: { in: STATUSES }

  belongs_to :idea, polymorphic: true
  belongs_to :user

  belongs_to :suggestion, -> { where(upvotes: {idea_type: 'Suggestion'}) },
  foreign_key: 'idea_id', optional: true

  belongs_to :event, -> { where(upvotes: {idea_type: 'Event'}) },
  foreign_key: 'idea_id', optional: true

  def self.find_by_user(idea, user)
    user.upvotes.where(idea_id: idea.id, idea_type: idea.class.to_s).first
  end
end
