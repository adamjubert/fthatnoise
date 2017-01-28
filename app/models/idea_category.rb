# == Schema Information
#
# Table name: idea_categories
#
#  id          :integer          not null, primary key
#  idea_id     :integer          not null
#  idea_type   :string           not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class IdeaCategory < ActiveRecord::Base
  validates :idea_id, :idea_type, :category_id, presence: true
  validates :category_id, :uniqueness => { :scope => [:idea_type, :idea_id] }

  belongs_to :idea, polymorphic: true
  belongs_to :category,
    class_name: "Category",
    primary_key: :id,
    foreign_key: :category_id
end
