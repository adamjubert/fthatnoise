json.id @user.id
json.username @user.username
json.zip_code @user.zip_code

json.events do
  json.array! @upvotes.each do |upvote|
    if upvote.idea_type == "Event"
      json.extract! upvote.idea, :id, :title, :shortened_description, :created_at, :formatted_date, :formatted_location,
      :formatted_time_range, :latitude, :longitude
      json.creator do
        json.extract! upvote.idea.creator, :id, :username
      end
      json.categories do
        upvote.idea.categories.each do |category|
          json.set! category.id do
            json.extract! category, :id, :name
          end
        end
      end
      json.upvotes_count upvote.idea.upvotes.select { |upvote| upvote.status != "ignore" }.length
      json.upvotes_status upvote.status
      json.creator_viewing upvote.idea.creator_id == @user.id
      json.in_past upvote.idea.date < Date.today
    end
  end
end

json.suggestions do
  json.array! @upvotes.each do |upvote|
    if upvote.idea_type == "Suggestion"
      json.extract! upvote.idea, :id, :title, :shortened_description, :created_at
      json.creator do
        json.extract! upvote.idea.creator, :id, :username
      end
      json.categories do
        upvote.idea.categories.each do |category|
          json.set! category.id do
            json.extract! category, :id, :name
          end
        end
      end
      json.upvotes_count upvote.idea.upvotes.select { |upvote| upvote.status != "ignore" }.length
      json.upvotes_status upvote.status
      json.creator_viewing upvote.idea.creator_id == @user.id
    end
  end
end
