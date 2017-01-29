# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :idea_categories, dependent: :destroy, inverse_of: :category
  has_many :suggestions, through: :idea_categories, source: :idea, source_type: "Suggestion"
  has_many :events, through: :idea_categories, source: :idea, source_type: "Event"
end
