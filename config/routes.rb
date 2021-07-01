Rails.application.routes.draw do
  
  resources :users
  post "/login", to: "auth#create"
  post "/auto_login", to: "auth#auto_login"
  get "/logged_in?", to: "application#logged_in?"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
