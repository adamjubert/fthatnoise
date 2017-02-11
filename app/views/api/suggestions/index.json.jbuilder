user = current_user

@suggestions.each do |suggestion|
  json.set! suggestion.id do
    json.extract! suggestion, :id, :title, :shortened_description, :created_at

    json.upvotes_count suggestion.upvotes.length

    json.categories do
      suggestion.categories.each do |category|
        json.set! category.id do
          json.extract! category, :id, :name
        end
      end
    end

    json.upvotes_status nil

    json.upvotes do
      suggestion.upvotes.each do |upvote|
        # json.set! upvote.user_id do
        #   json.extract! upvote, :id, :user_id, :status
        # end
        if user && upvote.user_id == user.id
          json.upvote_status upvote.status
        end
      end
    end

    json.creator do
      json.extract! suggestion.creator, :id, :username
    end
  end
end
