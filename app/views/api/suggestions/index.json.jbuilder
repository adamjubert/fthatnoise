user = current_user

json.array! @suggestions do |suggestion|
  json.extract! suggestion, :id, :title, :shortened_description, :created_at

  json.upvotes_count suggestion.upvotes.select { |upvote| upvote.status != "ignore" }.length

  json.categories do
    suggestion.categories.each do |category|
      json.set! category.id do
        json.extract! category, :id, :name
      end
    end
  end

  json.upvotes_status nil

  suggestion.upvotes.each do |upvote|
    if user && upvote.user_id == user.id
      json.upvotes_status upvote.status
    end
  end

  json.creator do
    json.extract! suggestion.creator, :id, :username
  end

  json.creator_viewing user == suggestion.creator
end
