Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'suggestions#index'

  resources :users, only: [:new, :create, :edit, :update, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :categories, only: [:index, :show]

  resources :suggestions do
    resources :upvotes, only: [:create]
    resources :comments, only: [:create]
  end

  resources :events do
    resources :upvotes, only: [:create]
    resources :comments, only: [:create]
  end

  resources :upvotes, only: [:destroy]
  resources :comments, only: [:destroy]
  resources :contacts, only: [:new, :create]

  get "/about", to: "static_pages#about", as: "about"
  get "/contact", to: "contacts#new", as: "contact"

  get '/near_me', to: "events#near_me", as: "events_near_me"
  get 'hot_events', to: "events#most_upvoted", as: "events_most_upvoted"
  get 'trending_events', to: "events#trending", as: "events_trending"

  get 'hot_suggestions', to: "suggestions#most_upvoted", as: "suggestions_most_upvoted"
  get 'trending_suggestions', to: "suggestions#trending", as: "suggestions_trending"
end
