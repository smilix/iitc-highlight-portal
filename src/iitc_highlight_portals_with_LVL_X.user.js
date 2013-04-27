// ==UserScript==
// @id             iitc-plugin-highlight-portals-with-LVL-X@smilix
// @name           iitc: highlight portals with LVL > X
// @version        1.2.0
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://github.com/smilix/iitc-highlight-portal/raw/master/src/iitc_highlight_portals_with_LVL_X.user.js
// @downloadURL    https://github.com/smilix/iitc-highlight-portal/raw/master/src/iitc_highlight_portals_with_LVL_X.user.js
// @description    Highlights Portals that are greater than a certain level.
// @include        https://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////
window.HIGHLIGHT_PORTAL_LEVEL = 6;
window.HIGHLIGHT_PORTAL_SHOW_RESISTANCE = true;
window.HIGHLIGHT_PORTAL_SHOW_ENLIGHTENED = true;

// use own namespace for plugin
window.plugin.highlightPortal = function() {};

window.plugin.highlightPortal.warnIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACTwAAAk8B95E4kAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJPSURBVEiJvdY9aFNRFAfw/71JikJMXiMJbrHgUgrPgpsJ3czQtQSFiBjrxyK10A46dLEtWMR+TRIFdRCE0E7OotLiIhozWggVh2DSpEkqSWr77nEoKXnNe8lLcsmBs517fu9yLvc+RpW/N1DeG4XEEACg+H5wzp8AIKMaO8p7o3i7cBVbCTmqGgS7Np1nnD80Q49gANhKAN8/SkFpbCLNnO7LALablfLutTp0bj3N+r0tUXlwm6gcuAMUqM240/APghbel6zM9GR0t+PfP4FvHyAKmfvtLu0OFhrYTNjFkpt3RCHzrHewHr/dDi7nVOvxxd7BenzcCi4PbsCzS72DdfjGLVHILvcO1uNRM9wc9g8C3CYFRynXgBvDahD0/EuJZuMlGTglPkdRyq00h2t3r9N9kdTAC4n4zXpcD5+48LnimyY18FIyvqqHTV4ZrvimpOGvH7sI7J44PJy3H6NjE6ZPG1d8U0INMMzGx9lM2AWhWQcHhoBQpEKhSBW2vhRznokxbl9jWi79jvWdvsKc7ktGqO6jC5lFltxsjSteIPygSqHrZdgdKeb2xOA4tQYgf1yjadojIjpPRLCS2m5mSXxaL9KIjSgI43wzV9H2q0+JqN+sDyMihiZ/g8Y7zy6z5EbUbOcU386zc/4LAHbNevB2UQDgineS1OArwwM3MATYHalmaA3uKLjinWTDI414KFJhbk+sZQOrszXN4s5K/czFn195IvK0Wtc9XI9Hh0nspL9aWSMHPsJXRTG3T9q/u72FiaAdHMwT0Vkrtf8Bs1LCEYmcvWwAAAAASUVORK5CYII',
    shadowUrl: null,

    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [-2, -2], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

window.plugin.highlightPortal.warnMarkerList = {};

window.plugin.highlightPortal.portalAdded = function(data) {
  var d = data.portal.options;
  var layer = plugin.highlightPortal.highlightLayer;  
  
  var teamMatch = window.HIGHLIGHT_PORTAL_SHOW_RESISTANCE && d.team === 1 ||
                  window.HIGHLIGHT_PORTAL_SHOW_ENLIGHTENED && d.team === 2;

  if(teamMatch && d.level >= window.HIGHLIGHT_PORTAL_LEVEL) {
  	// Wenn für das Portal bereits ein Marker existiert, dann brauchen wir nichts weiter zu tun.
  	if(window.plugin.highlightPortal.warnMarkerList[d.guid]) {
  	  return;
  	}
  	
    // Marker erzeugen, zur Karte hinzufügen und im Portalobjekt speichern.
  	var warnmarker = L.marker(data.portal._latlng,{icon: window.plugin.highlightPortal.warnIcon});
  	warnmarker.addTo(layer);
  	window.plugin.highlightPortal.warnMarkerList[d.guid] = warnmarker;
  	
  } else {
    // Falls ein Marker vorhanden ist, entfernen
    if(window.plugin.highlightPortal.warnMarkerList[d.guid]) {
      layer.removeLayer(window.plugin.highlightPortal.warnMarkerList[d.guid]);
      delete window.plugin.highlightPortal.warnMarkerList[d.guid]; // Aus der Liste entfernen
  	  return;
  	}
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
