Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'suggestions#index'

  resources :users, only: [:new, :create, :edit, :show]
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
end
