Rails.application.routes.draw do
  root 'home#index'
  get '/map', to: 'maps#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      get '/markets', to: 'markets#index'
      get '/market/:fmid', to: 'markets#show'

      get '/states/:stateName/markets', to: 'states#markets'
      get '/user/:id', to: 'users#show'
    end
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
