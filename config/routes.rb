Rails.application.routes.draw do
  resources :submissions, except: [:show]
  resources :questions
  resources :games, only: [:show, :create, :update]
  resources :challenges, only: [:index, :create, :destroy]

  post "/signup", to: "users#create"

  get "/me", to: "users#show"

  patch "/users/:id", to: "users#update"

  get "/users", to: "users#index"

  post "/login", to: "sessions#create"

  post "/admin-login", to: "sessions#admin"

  get "/admin-session", to: "admins#show"

  delete "/logout", to: "sessions#destroy"

  get "/current-game", to: "game_sessions#show"

  delete "/current-game", to: "game_sessions#destroy"

  get '/pending-submissions', to: "submissions#pending"

  get '/approved-submissions', to: "submissions#approved"

  post '/approved-questions/:submission_id', to: "questions#create"

  mount ActionCable.server => '/cable'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
