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

  # def upvotes_count
  #   upvotes.count
  # end

  def recent_upvotes_count
   upvotes
     .select('id')
     .where("created_at > ?", 1.day.ago)
     .count
  end

  def shortened_description
    if description.length < 140
      description
    else
      "#{description[0..139]}..."
    end
  end

  def category_ids=(ids)
    ids = ids.reject(&:blank?).map(&:to_i)
    super(ids)
  end


  module ClassMethods
    def find_with_upvotes(id)
      self.select("#{self.table_name}.*, COUNT(upvotes.id) AS upvotes_count")
      .joins(:upvotes)
      .where("#{self.table_name}.id = ?", id)
      .group("#{self.table_name}.id")
      .includes(:categories)
      .includes(:comments)
      .first
    end

    def order_by_created_at
      self.select("#{self.table_name}.*, COUNT(upvotes.id) AS upvotes_count")
      .joins(:upvotes)
      .group("#{self.table_name}.id")
      .order("#{self.table_name}.created_at DESC")
      .includes(:categories)
    end

    def order_by_upvotes
      self.select("#{self.table_name}.*, COUNT(upvotes.id) AS upvotes_count")
      .joins(:upvotes)
      .group("#{self.table_name}.id")
      .order("COUNT(upvotes.id) DESC")
      .includes(:categories)
    end

    def by_category(category_name)
      self.joins(:categories).where('categories.name' => category_name).order("created_at DESC")
    end
  end
end
