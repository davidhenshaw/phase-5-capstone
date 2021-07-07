Rails.application.routes.draw do
  
  resources :members
  resources :projects
  resources :categories do 
    resources :projects, only: [:index, :show]
  end
  resources :posts
  resources :users
  post "/get_user", to: "users#get"
  post "/login", to: "auth#create"
  post "/auto_login", to: "auth#auto_login"
  get "/logged_in?", to: "application#logged_in?"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
