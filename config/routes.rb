Rails.application.routes.draw do
  
  resources :reviews
  resources :games
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
  get "all_games", to: 'games#from_api'
  get "/game/:id", to: 'games#show'

  post '/signup', to: 'users#create'

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

end
