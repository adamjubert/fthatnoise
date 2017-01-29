module Taggable
  extend ActiveSupport::Concern

  included do
  # validations and associations usually go here
    has_many :idea_categories, as: :idea, dependent: :destroy, inverse_of: :idea
    has_many :categories, through: :idea_categories
    has_many :upvotes, as: :idea, dependent: :destroy
    has_many :supporters, through: :upvotes, source: :user
    has_many :comments, as: :idea, dependent: :destroy

    belongs_to :creator,
      class_name: "User",
      primary_key: :id,
      foreign_key: :creator_id
  end

  def creator_name
    creator.username
  end

  def upvotes_count
    upvotes.count
  end

  module ClassMethods

    def by_category_name(category_name)
      self.joins(:categories).where('categories.name' => category_name)
    end
  end
end
