import $ from 'jquery';
import usageojson from '../usageojson';

// Globals below are locally global, may need to export app wide globals. Not accessible via devtools.
var g_markets;
var activeMarket;
var activeMarker;  
var activeState;

$(function() {
  if ($('#index.maps').length > 0) {
    buildMap();

    $("#side_panel").on("click", "#close_side_panel", function () {
      $("#side_panel").hide();
    });
  }
});

function buildMap() {
  $('#side_panel').hide();
  $('#zoom_to_state_view').hide();
  mainMap = L.map("map").setView([36, -102], 5);

  g_markets = L.featureGroup().addTo(mainMap);

  addBasemap();
  addGeoJSON();

  $('#side_panel').on('click', '#zoom_to_market', function() {
    $("#zoom_to_state_view").attr('hidden', false);
    var lng = this.dataset.lng;
    var lat = this.dataset.lat;
    var coords = new L.latLng(lat, lng);
    mainMap.setView(coords, 15);
  });
  $("#side_panel").on("click", "#zoom_to_state_view", function () {
    mainMap.fitBounds(activeState.getBounds());
    $("#zoom_to_state_view").attr("hidden", true);
  });
};

function addBasemap() {
  var OpenStreetMap_Mapnik = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(mainMap);
}

function addGeoJSON() {
  var style1 = {
    color: "gray",
  };
  var style2 = {
    color: "red",
  };
  var style3 = {
    color: "green",
  };
  L.geoJSON(usageojson, {
    style: function (feature) {
      return style1;
    },
    onEachFeature: function (feature, layer) {
      layer.id = feature.properties.NAME;
      layer.on("mouseover", function (e) {
        if (activeState && activeState.id == this.id) return; 

        this.setStyle(style2);
      });
      layer.on("mouseout", function (e) {
        if (activeState && activeState.id == this.id) return;
        
        this.setStyle(style1);
      });
      layer.on("click", function (e) {
        if (activeState != undefined && activeState != this){
          activeState.setStyle(style1);
        }
        activeState = this;
        let current = this.getBounds();
        this.setStyle(style3);
        this.bringToFront();
        mainMap.fitBounds(current);
        mainMap.currentStateBds = current;
        getStateMarkets(e.target.id);
      });
    },
  }).addTo(mainMap);
}

function getStateMarkets(stateName){
  g_markets.clearLayers();
  $.ajax({
    url: `api/v1/states/${stateName}/markets`,
    method: "GET",
  }).done(function(data) {
    data.forEach(function (market) {
      let x = market.x;
      let y = market.y;
      if (x != null && y != null) {
        var coords = L.latLng(y, x);
        var marker = L.marker(coords);
        marker.addTo(g_markets).setLatLng(coords);
        marker.on('click', function(){
          getSingleMarket(market.id, marker._leaflet_id)
          activeMarker = this;
        })
      }
    });
  })
}

function getSingleMarket(marketId, markerId){
  $.ajax({
    url: `/api/v1/market/${marketId}`,
    method: 'get',
    success: function (data) {
      $("#side_panel").html(data);
      $('#side_panel').show();
    },
    error: function(data) {
      console.log(data)
    }
  })
}

function buildMarketInfo(market){
  var el = document.getElementById('market_details')
  render(helloTemplate(market), el)
}

function favoriteMarket(){
  var id = activeMarket.id
  $.ajax({
    url: `/api/v1/favorites/${id}`,
    method: "post",
    headers: {
      "X-Transaction": "POST Example",
      "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
    },
    success: function (data) {
      $('#favor_market').hide();
      $('#unfavor_market').show()
    },
    error: function (error) {
      console.log("ERROR", error);
    },
  });
}