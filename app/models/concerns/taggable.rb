module Taggable
  extend ActiveSupport::Concern

  included do
  # validations and associations usually go here
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
      self.select("#{self.table_name}.*")
      .order("#{self.table_name}.created_at DESC")
      .includes(:categories, :creator, :upvotes)
    end

    def order_by_upvotes
      self.select("#{self.table_name}.*, COUNT(upvotes.id) AS upvotes_count")
      .joins(:upvotes)
      .group("#{self.table_name}.id")
      .order("COUNT(upvotes.id) DESC")
      .includes(:categories)
    end

    def get_by_category(category_id)
      self.select("#{self.table_name}.*, COUNT(upvotes.id) AS upvotes_count")
      .joins(:upvotes)
      .joins(:categories)
      .where("categories.id = ?", category_id)
      .group("#{self.table_name}.id, categories.id")
      .order("#{self.table_name}.created_at DESC")
    end

    def test(category_id)
      self.find_by_sql(["SELECT #{self.table_name}.*, COUNT(upvotes.id) AS upvotes_count, categories.*
        FROM #{self.table_name}
        INNER JOIN upvotes
        ON upvotes.idea_id = #{self.table_name}.id AND upvotes.idea_type = \'#{self.to_s}\'
        INNER JOIN idea_categories AS main_idea_categories
        ON main_idea_categories.idea_id = #{self.table_name}.id AND main_idea_categories.idea_type = \'#{self.to_s}\'
        INNER JOIN categories AS main_categories
        ON main_categories.id = main_idea_categories.category_id
        INNER JOIN idea_categories AS other_idea_categories
        ON other_idea_categories.idea_id = #{self.table_name}.id AND other_idea_categories.idea_type = \'#{self.to_s}\'
        INNER JOIN categories
        ON categories.id = other_idea_categories.category_id
        WHERE main_categories.id = ?
        GROUP BY #{self.table_name}.id, categories.id", category_id])
    end
  end
end
