@suggestions.each do |suggestion|
  json.set! suggestion.id do
    json.extract! suggestion, :id, :title, :description, :created_at

    json.upvotes_count suggestion.upvotes.length

    json.categories do
      json.array! suggestion.categories do |category|
        json.extract! category, :id, :name
      end
    end

    json.upvotes_status nil

    # json.upvotes do
    #   suggestion.upvotes.each do |upvote|
    #     json.set! upvote.user_id do
    #       json.extract! upvote, :id, :user_id, :status
    #     end
    #   end
    # end

    suggestion.upvotes.each do |upvote|
      if upvote.user == current_user
        json.upvotes_status upvote.status
        break
      end
    end

    json.creator do
      json.extract! suggestion.creator, :id, :username
    end
  end
end
