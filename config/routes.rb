Rails.application.routes.draw do
  root 'home#index'
  get '/map', to: 'maps#index', as: 'maps'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  get '/register', to: 'users#new'
  post '/register', to: 'users#create'

  get '/login', to: 'sessions#login'
  post '/login', to: 'sessions#new'
  post '/logout', to: 'sessions#delete'

  namespace :api do
    namespace :v1 do
      get '/markets', to: 'markets#index'
      get '/market/:id', to: 'markets#show'

      get '/states/:stateName/markets', to: 'states#markets'
      get '/user/:id', to: 'users#show'
    end
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
