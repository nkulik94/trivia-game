Rails.application.routes.draw do
  resources :questions
  resources :games, only: [:show, :create, :update, :destroy]
  resources :challenges, only: [:index, :create, :update, :destroy]

  post "/signup", to: "users#create"

  get "/me", to: "users#show"

  post "/login", to: "sessions#create"

  delete "/logout", to: "sessions#destroy"

  get "/current-game", to: "game_sessions#show"

  delete "/current-game", to: "game_sessions#destroy"

  mount ActionCable.server => '/cable'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
