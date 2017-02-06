# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  admin           :boolean          default("false"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string           not null
#  city            :string
#  state           :string
#

class User < ActiveRecord::Base
  has_secure_password

  validates :email, :password_digest, :session_token, presence: true
  validates :username, presence: true, uniqueness: true, length: { maximum: 25 }
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token, :basic_city_update

  attr_reader :password

  has_many :suggestions,
    class_name: "Suggestion",
    primary_key: :id,
    foreign_key: :creator_id,
    dependent: :destroy

  has_many :events,
    class_name: "Event",
    primary_key: :id,
    foreign_key: :creator_id,
    dependent: :destroy

  has_many :comments

  has_many :upvotes, dependent: :destroy
  has_many :supported_suggestions, through: :upvotes, source: :idea, source_type: "Suggestion"
  has_many :supported_events, through: :upvotes, source: :idea, source_type: "Event"

  def self.generate_random_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    return user if user && user.is_password?(password)
    nil
  end

  # def password=(password)
  #   @password = password
  #   self.password_digest = BCrypt::Password.create(password)
  # end

  def upvoted_idea_ids
    @upvoted_idea_ids ||= upvotes.pluck(:idea_id)
  end

  def upvoted?(idea)
    upvoted_idea_ids.include?(idea.id)
  end

  def is_password?(password)
    # BCrypt::Password.new(password_digest).is_password?(password)
    !!self.try(:authenticate, password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_random_token
    self.save
    self.session_token
  end

  def formatted_location
    if city != "" && state
      "#{city}, #{state}"
    elsif state
      state
    elsif city
      city
    else
      "Not set"
    end
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_random_token
  end

  def basic_city_update
    return unless city

    if ["nyc", "ny"].include?(city.downcase)
      self.city = "New York"
    elsif ["sf", "san fran"].include?(city.downcase)
      self.city = "San Francisco"
    elsif city.downcase == "philly"
      self.city = "Philadelphia"
    elsif city.downcase == "la"
      self.city = "Los Angeles"
    end

    self.city = city.split(" ").map(&:capitalize).join(" ")
  end
end
