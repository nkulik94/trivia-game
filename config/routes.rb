Rails.application.routes.draw do
  resources :questions
  resources :games, only: [:create, :update, :destroy]
  resources :challenges, only: [:index, :create, :update, :destroy]

  post "/signup", to: "users#create"

  get "/me", to: "users#show"

  post "/login", to: "sessions#create"

  delete "/logout", to: "sessions#destroy"

  mount ActionCable.server => '/cable'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "/hello", to: "application#hello"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
