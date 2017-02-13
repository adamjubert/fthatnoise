Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :destroy]

    resources :categories, only: [:index, :create]
    resources :comments, only: [:create, :destroy]

    resources :suggestions, except: [:new, :edit] do
      patch "/pending_upvote", to: "suggestions#pending_upvote", as: "pending_upvote"
      patch "/ignore_upvote", to: "suggestions#ignore_upvote", as: "ignore_upvote"
      patch "/complete_upvote", to: "suggestions#complete_upvote", as: "complete_upvote"
    end

    resources :events, except: [:new, :edit] do
      patch "/pending_upvote", to: "events#pending_upvote", as: "pending_upvote"
      patch "/ignore_upvote", to: "events#ignore_upvote", as: "ignore_upvote"
      patch "/complete_upvote", to: "events#complete_upvote", as: "complete_upvote"
    end

    resources :contacts, only: [:create, :index]

    # get "/about", to: "static_pages#about", as: "about"
    # get "/contact", to: "contacts#new", as: "contact"
    #
    # get '/near_me', to: "events#near_me", as: "events_near_me"
    # get 'hot_events', to: "events#most_upvoted", as: "events_most_upvoted"
    # get 'trending_events', to: "events#trending", as: "events_trending"
    #
    # get 'hot_suggestions', to: "suggestions#most_upvoted", as: "suggestions_most_upvoted"
    # get 'trending_suggestions', to: "suggestions#trending", as: "suggestions_trending"
  end
end
