// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
// import "controllers";

var mainMap;
var activeMarker = "";
var activeState = "";
// L is available to all below imports
import $ from "jquery";
import L from 'leaflet'
import 'bootstrap'
import './maps/index'


// Zm3cRt4SnS  // USDA API key