Rails.application.routes.draw do
  resources :submissions
  resources :questions
  resources :games, only: [:show, :create, :update]
  resources :challenges, only: [:index, :create, :destroy]

  post "/signup", to: "users#create"

  get "/me", to: "users#show"

  patch "/users/:id", to: "users#update"

  post "/login", to: "sessions#create"

  post "/admin-login", to: "sessions#admin"

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
