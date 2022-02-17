import $ from "jquery";

var mainMap;

$(function () {
  mainMap = L.map("map").setView([36, -102], 5);

  var OpenStreetMap_Mapnik = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(mainMap);

  getAllMarkets(mainMap);
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
