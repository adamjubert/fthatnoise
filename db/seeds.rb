User.destroy_all
Category.destroy_all
Event.destroy_all
Suggestion.destroy_all
IdeaCategory.destroy_all
Upvote.destroy_all
Comment.destroy_all

User.create(username: "aa", email: "aa@nyc.com",
password: "password", password_confirmation: "password", zip_code: 10001)

categories = [
  "Immigration",
  "Racial Equality",
  "Gender Equality",
  "LGBTQ",
  "Socioeconomic Issues",
  "Health",
  "Education",
  "Environment",
  "Voting Rights",
  "Free Speech",
  "Gun Control"
]

categories.each do |category|
  Category.create(name: category)
end

# comment the below in for development DB
# User.create(username: "flaurida", email: "laura@nyc.com",
# password: "password", password_confirmation: "password", admin: true)

# 50.times do
#   User.create(username: Faker::GameOfThrones.character, email: Faker::Internet.free_email,
#   password: "password",
#   password_confirmation: "password",
#   zip_code: Faker::Address.zip_code)
# end
#
# user_ids = User.all.ids
#
# 10.times do
#   Category.create(name: Faker::Superhero.name)
# end
#
# 50.times do
#   Suggestion.create(title: Faker::Food.ingredient,
#   description: Faker::StarWars.quote,
#   creator_id: user_ids.sample)
# end
#
# 100.times do
#   Event.create(title: Faker::Book.title,
#   description: Faker::StarWars.wookie_sentence,
#   creator_id: user_ids.sample,
#   address: Faker::Address.street_address,
#   city: Faker::Address.city,
#   state: Faker::Address.state,
#   date: Faker::Date.between(Date.today + 1.week, Date.today + 1.year),
#   start_time: Faker::Time.between(DateTime.now - 1, DateTime.now),
#   end_time: Faker::Time.between(DateTime.now - 1, DateTime.now)
#   )
# end
#
# category_ids = Category.all.ids
# idea_types = %w(Event Suggestion)
#
#
# 200.times do
#   idea_type = idea_types.sample
#
#   if idea_type == "Event"
#     idea_id = Event.all.ids.sample
#   else
#     idea_id = Suggestion.all.ids.sample
#   end
#
#   IdeaCategory.create(category_id: category_ids.sample,
#   idea_type: idea_type, idea_id: idea_id)
# end
#
# 1000.times do
#   idea_type = idea_types.sample
#
#   if idea_type == "Event"
#     idea_id = Event.all.ids.sample
#   else
#     idea_id = Suggestion.all.ids.sample
#   end
#
#   Upvote.create(user_id: user_ids.sample,
#   idea_type: idea_type, idea_id: idea_id)
# end
#
# 200.times do
#   idea_type = idea_types.sample
#
#   if idea_type == "Event"
#     idea_id = Event.all.ids.sample
#   else
#     idea_id = Suggestion.all.ids.sample
#   end
#
#   Comment.create(user_id: user_ids.sample,
#   idea_type: idea_type, idea_id: idea_id,
#   body: Faker::TwinPeaks.quote)
# end
