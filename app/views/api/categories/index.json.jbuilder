json.array! @categories.each do |category|
  json.extract! category, :id, :name
end
