user = current_user

json.extract! @suggestion, :id, :title, :description, :created_at

json.upvotes_count @suggestion.upvotes.select { |upvote| upvote.status != "ignore" }.length

json.categories do
  @suggestion.categories.each do |category|
    json.set! category.id do
      json.extract! category, :id, :name
    end
  end
end

json.comments do
  json.array! @suggestion.comments do |comment|
    json.extract! comment, :id, :user_id, :created_at, :body
    json.author comment.user.username
  end
end

json.upvotes_status nil

@suggestion.upvotes.each do |upvote|
  # json.set! upvote.user_id do
  #   json.extract! upvote, :id, :user_id, :status
  # end
  if user && upvote.user_id == user.id
    json.upvotes_status upvote.status
  end
end

json.creator do
  json.extract! @suggestion.creator, :id, :username
end

json.creator_viewing current_user == @suggestion.creator
