user = current_user

json.array! @events do |event|
  json.extract! event, :id, :title, :shortened_description, :created_at, :formatted_date, :formatted_location,
  :formatted_time_range, :latitude, :longitude

  json.upvotes_count event.upvotes.select { |upvote| upvote.status != "ignore" }.length

  json.categories do
    event.categories.each do |category|
      json.set! category.id do
        json.extract! category, :id, :name
      end
    end
  end

  json.upvotes_status nil

  event.upvotes.each do |upvote|
    if user && upvote.user_id == user.id
      json.upvotes_status upvote.status
    end
  end

  json.creator do
    json.extract! event.creator, :id, :username
  end

  json.creator_viewing current_user == event.creator

  json.in_past event.date < Date.today
end
