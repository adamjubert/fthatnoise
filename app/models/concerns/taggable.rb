module Taggable
  extend ActiveSupport::Concern

  included do
    validates :creator, presence: true
    validates :title, presence: true, length: { maximum: 50 }
    validates :categories, presence: { message: "- must have between 1 and 3 categories"},
      length: { maximum: 3, message: "- cannot have more than 3 categories" }

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
      "#{description[0..300]}..."
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

    def order_by(order, category_id)
      if order == "trending"
        ideas = self.order_by_recent_upvotes(category_id)
        order_string = "count(upvotes.id) DESC"
      elsif order == "hot"
        ideas = self.order_by_upvotes(category_id)
        order_string = "count(upvotes.id) DESC"
      else
        ideas = self.order_by_created_at(category_id)
        order_string = "#{self.table_name}.created_at DESC"
      end

      return ideas
        .where.not("upvotes.status = ?", "ignore")
        .group("#{self.table_name}.id")
        .includes(:categories, :creator, :upvotes)
        .order(order_string)
    end

    def order_by_created_at(category_id = nil)
      if category_id
        self
          .select("#{self.table_name}.*, count(upvotes.id) AS upvotes_count")
          .left_joins(:upvotes, :categories)
          .where("categories.id = ?", category_id)
      else
        self
          .select("#{self.table_name}.*, count(upvotes.id) AS upvotes_count")
          .left_joins(:upvotes)
      end
    end

    def order_by_upvotes(category_id = nil)
      if category_id
        self
          .select("#{self.table_name}.*, count(upvotes.id) AS upvotes_count")
          .left_joins(:upvotes, :categories)
          .where("categories.id = ?", category_id)
      else
        self
          .select("#{self.table_name}.*, count(upvotes.id) AS upvotes_count")
          .left_joins(:upvotes)
      end
    end

    def order_by_recent_upvotes(category_id = nil)
      if category_id
        ideas = self
        .select("#{self.table_name}.*, count(upvotes.id) AS upvotes_count")
        .left_joins(:upvotes, :categories)
        .where("categories.id = ?", category_id)
      else
        ideas = self
        .select("#{self.table_name}.*, count(upvotes.id) AS upvotes_count")
        .left_joins(:upvotes)
      end

      ideas.where("upvotes.created_at > ?", 1.week.ago)
    end
  end
end
