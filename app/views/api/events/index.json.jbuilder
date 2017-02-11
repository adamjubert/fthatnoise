user = current_user

@events.each do |event|
  json.set! event.id do
    json.extract! event, :id, :title, :shortened_description, :created_at, :formatted_date, :formatted_location,
    :formatted_time_range

    json.upvotes_count event.upvotes.length

    json.categories do
      event.categories.each do |category|
        json.set! category.id do
          json.extract! category, :id, :name
        end
      end
    end

    json.upvotes_status nil

    json.upvotes do
      event.upvotes.each do |upvote|
        # json.set! upvote.user_id do
        #   json.extract! upvote, :id, :user_id, :status
        # end
        if user && upvote.user_id == user.id
          json.upvote_status upvote.status
        end
      end
    end

    json.creator do
      json.extract! event.creator, :id, :username
    end
  end
end
