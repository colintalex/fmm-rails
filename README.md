
1)New Rails 7 App
2)Add to application.html.erb `<meta name="turbo-visit-control" content="reload">` **For leaflet reload on page revisit*

## ImportMaps
Relies on Hotwire/Turbo gems pre-packaged with Rails. Do not skip install. Import Map is setup by default.
**Note favor towards ESM modules.

#### Add Libraries 
1) run **bin/importmap pin npm-packge-name**
    - Run with `--download` flag to save in vendor folder

OR 

1) define yourself in **config/importmap.rb** (see ImportMap docs)

2) In **app/javascript/application.js**,add  **import 'package-name'**

#### Seperate Files for Views
- ex. Allow maps.js only to load on map view.

1) Create **app/javascript/maps.js**
2) Move any existing, map-only code to **maps.js**
3) Add new code for maps here.
2) Go to **config/importmap.rb**, under `pin 'application' `, add `pin 'maps'`.
3) Add `<%= yield :head %>` to **application.html.erb**
4) Go to maps view, add to top of **html.erb** file:
```
<% content_for :head do %>
  <%= javascript_import_module_tag 'maps' %>
<% end%>
```
5) Now maps.js will only be loaded in a view where module is imported.