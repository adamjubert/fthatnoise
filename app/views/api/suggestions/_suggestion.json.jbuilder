json.extract! @suggestion, :id, :title, :description, :created_at, :upvotes_count

json.categories do
  json.array! @suggestion.categories do |category|
    json.extract! category, :id, :name
  end
end

json.creator do
  json.extract! @suggestion.creator, :id, :username
end
