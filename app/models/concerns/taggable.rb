module Taggable
  extend ActiveSupport::Concern

  included do
  # validations and associations usually go here
    has_many :idea_categories, as: :idea, dependent: :destroy, inverse_of: :idea
    has_many :categories, through: :idea_categories
  # etc
  end

  module TaggableMethods

    def tags_string
      categories.map(&:name).join(', ')
    end
  end

  module ClassMethods

    def by_category_name(category_name)
      self.joins(:categories).where('categories.name' => category_name)
    end
  end
end
