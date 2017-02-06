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

  validates :description, presence: true
end
