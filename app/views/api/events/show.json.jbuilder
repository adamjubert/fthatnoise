user = current_user

json.extract! @event, :id, :title, :description, :created_at, :formatted_date, :formatted_location, :formatted_time_range

json.upvotes_count @event.upvotes.length

json.categories do
  @event.categories.each do |category|
    json.set! category.id do
      json.extract! category, :id, :name
    end
  end
end


json.comments do
  json.array! @event.comments do |comment|
    json.extract! comment, :id, :user_id, :created_at, :body
    json.author comment.user.username
  end
end

json.upvotes_status nil

json.upvotes do
  @event.upvotes.each do |upvote|
    # json.set! upvote.user_id do
    #   json.extract! upvote, :id, :user_id, :status
    # end
    if user && upvote.user_id == user.id
      json.upvote_status upvote.status
    end
  end
end

json.creator do
  json.extract! @event.creator, :id, :username
end

json.creator_viewing current_user == @event.creator
