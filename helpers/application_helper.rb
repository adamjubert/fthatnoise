module ApplicationHelper
  def form_auth_token
    "<input type=\"hidden\"
    name=\"authenticity_token\"
    value=\"#{form_authenticity_token}\">".html_safe
  end

  def upvote_buttons(idea)
    if idea.is_a?(Suggestion)
      message = "I'm on it!"
      action_url = suggestion_upvotes_url(idea)
    elsif idea.is_a?(Event)
      message = "I'm going!"
      action_url = event_upvotes_url(idea)
    end

    if current_user.upvoted?(idea)
      upvote = Upvote.find_by_user(idea, current_user)
      button_to "Never mind...", upvote_url(upvote), method: :delete, class: "button ignore-button"
    else
      button_to message, action_url, method: :post, class: "button accept-button"
    end
  end

  def categories_string(idea)
    categories_string = "<p class=\"short-idea-categories-wrapper\">"
    categories = idea.categories

    categories.each_with_index do |category, i|
      categories_string << "<a class=\"short-idea-categories\" href=\"#{category_url(category)}\">#{h(category.name)}</a>"
      categories_string << " " unless i >= categories.length - 1
    end

    categories_string << "</p>"
    categories_string.html_safe
  end

  def idea_link(idea)
    if idea.is_a?(Suggestion)
      (link_to idea.title, suggestion_url(idea))
    elsif idea.is_a?(Event)
      (link_to idea.title, event_url(idea))
    end
  end

  def time_info(idea)
    if idea.is_a?(Event)
      "#{h(idea.formatted_date)} #{h(idea.formatted_time_range)}<br>".html_safe
    end
  end

  def location_info(idea)
    if idea.is_a?(Event)
      "#{h(idea.formatted_location)}<br>".html_safe
    end
  end
end
