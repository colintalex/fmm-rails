import $ from "jquery";
import usageojson from './usageojson'

var mainMap;
var g_markets;
$(function () {
  mainMap = L.map("map").setView([36, -102], 5);
  g_markets = L.featureGroup().addTo(mainMap);
  var OpenStreetMap_Mapnik = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(mainMap);
  var style1 = {
    color: 'blue'
  }
  var style2 = {
    color: 'red'
  }
  L.geoJSON(usageojson, {
    style: function (feature) {
      return { color: style2  };
    },
    onEachFeature: function(feature, layer){
      layer.id = feature.properties.NAME;
      layer.on('mouseover', function(e){
        this.setStyle(style2)
      });
      layer.on('mouseout', function(e){
        this.setStyle({ color: style1});
      });
      layer.on('click', function(e){
        let current = this.getBounds();
        this.setStyle(style2)
        mainMap.fitBounds(current)
        mainMap.currentStateBds = current
        getStateMarkets(e.target.id)
      })
    }
  }).addTo(mainMap);
  // getAllMarkets(mainMap);
});

function getAllMarkets() {
  function addMarkers(data) {}
  $.ajax({
    url: "api/v1/markets",
    method: "GET",
  }).done(function (data) {
    data.forEach(function (market) {
      let x = market.x;
      let y = market.y;
      if (x != null && y != null) {
        var coords = L.latLng(y, x);
        var marker = L.marker(coords);
        marker.addTo(mainMap).setLatLng(coords);
      }
    });
  });
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
      $('#side_panel').show();
      $('#market_details').empty().html(data.fmid)
      $("#zoom_to_market").data("marker_id", markerId);
      $('.marker-zoom-btn').on("click", function () {
        console.log(this.id)
        if (this.id == 'zoom_to_market'){
          $("#zoom_to_market").hide();
          $("#zoom_to_state_view").show();
          let leafletId = $(this).data("marker_id");
          let marker = g_markets.getLayer(leafletId);
          mainMap.flyTo(marker.getLatLng(), 14);
        }else{
          $("#zoom_to_market").show();
          $("#zoom_to_state_view").hide();
          mainMap.fitBounds(mainMap.currentStateBds);
        }
      });
    },
    error: function(data) {
      console.log(data)
    }
  })
}