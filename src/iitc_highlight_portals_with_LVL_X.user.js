// ==UserScript==
// @name           iitc: highlight portals with LVL > X
// @version        1.1.1
// @namespace      https://github.com/breunigs/ingress-intel-total-conversion
// @updateURL      http://jenseitsderfenster.de/hochgeladenesZeugs/iitc_highlight_portals_with_LVL_X.user.js
// @downloadURL    http://jenseitsderfenster.de/hochgeladenesZeugs/iitc_highlight_portals_with_LVL_X.user.js
// @description    Highlights Portals that are greater than a certain level.
// @include        https://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.highlightPortal = function() {};

window.plugin.highlightPortal.warnIcon = L.icon({
    iconUrl: 'http://jenseitsderfenster.de/hochgeladenesZeugs/warning_marker.png',
    shadowUrl: null,

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [-2, -2], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

window.plugin.highlightPortal.portalAdded = function(data) {
  var d = data.portal.options;
  var layer = plugin.highlightPortal.highlightLayer;  
  
  if(d.level >= 6 && d.team === 1) {
    // Pinken Marker drauftun
  	L.marker(data.portal._latlng,{icon: window.plugin.highlightPortal.warnIcon}).addTo(layer);
  }
}

var setup =  function() {
  // Erstelle einen neuen Layer für die Spezialmarkierungen
  plugin.highlightPortal.highlightLayer = new L.LayerGroup();
  window.layerChooser.addOverlay(plugin.highlightPortal.highlightLayer, 'Highlight Portal');
  map.addLayer(plugin.highlightPortal.highlightLayer);

  window.addHook('portalAdded', window.plugin.highlightPortal.portalAdded);
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
