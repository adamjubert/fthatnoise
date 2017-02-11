json.extract! @suggestion, :id, :title, :description, :created_at

json.upvotes_count @suggestion.upvotes.length

json.categories do
  json.array! @suggestion.categories do |category|
    json.extract! category, :id, :name
  end
end

# Improve performance here? need to include user names in this (N+1)
json.comments do
  json.array! @suggestion.comments do |comment|
    json.extract! comment, :id, :user_id, :created_at, :body
    json.author comment.author_name
  end
end

json.upvotes do
  @suggestion.upvotes.each do |upvote|
    json.set! upvote.user_id do
      json.extract! upvote, :id, :user_id, :status
    end
  end
end

json.creator do
  json.extract! @suggestion.creator, :id, :username
end

json.creator_viewing current_user == @suggestion.creator
