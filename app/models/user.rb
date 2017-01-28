# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  admin           :boolean          default("false"), not null
#  location        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string           not null
#

class User < ActiveRecord::Base
  has_secure_password

  validates :email, :password_digest, :session_token, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :suggestions,
    class_name: "Suggestion",
    primary_key: :id,
    foreign_key: :creator_id

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

  def is_password?(password)
    # BCrypt::Password.new(password_digest).is_password?(password)
    !!self.try(:authenticate, password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_random_token
    self.save
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_random_token
  end
end
