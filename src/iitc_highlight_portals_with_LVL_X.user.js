// ==UserScript==
// @id             iitc-plugin-highlight-portals-with-LVL-X@smilix
// @name           iitc: highlight portals with LVL > X
// @version        1.3.1
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
window.HIGHLIGHT_PORTAL_LEVEL = 7;
window.HIGHLIGHT_PORTAL_SHOW_RESISTANCE = true;
window.HIGHLIGHT_PORTAL_SHOW_ENLIGHTENED = true;

// use own namespace for plugin
window.plugin.highlightPortal = function() {};

// team: Resistance == 1, Enlightened == 2
window.plugin.highlightPortal.createIcon = function(portalLevel, team, base64Data) {
  var iconName = 'icon_' + portalLevel + '_' + team;
  window.plugin.highlightPortal[iconName] = L.icon({
    iconUrl: 'data:image/png;base64,' + base64Data,
    shadowUrl: null,
    iconSize:     [30, 30], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [team === 1 ? -2 : 33, -2], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });
  console.log(window.plugin.highlightPortal[iconName]);
};

window.plugin.highlightPortal.getIcon = function(portalLevel, team) {
  // we get floats as portal level...
  portalLevel = Math.floor(portalLevel);
  var iconName = 'icon_' + portalLevel + '_' + team;
  var icon = window.plugin.highlightPortal[iconName];
  if (!icon) {
    throw new Error('Can´t find arrow icon for portal level ' + portalLevel + ' and team ' + team);
  }
  return window.plugin.highlightPortal[iconName];
};

window.plugin.highlightPortal.createIcon(7, 2, 'iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACTwAAAk8B95E4kAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJrdZLTBNRFAbg/95paTtlLFRYaEFNdAMbQgImuiFCwsqgcWMkPigK1EfcYnThSo1GN2pifCG+UIkJgu8YqJi4NIaYoAsNmiAg8p4plk5njgtaAmWmnWpPMovbc6Zfz5zemWFEBJNwaaAuHVrFGManzIrSjXzk57AkKAA4JzDZc1m/UvwQ7RlBu/nriC1FTdiL3MrDPBBkxIoe0CPTQuWVbFO/zXGjXHaNJ2ovtOvxdSoUAMIr4d1yiDUFGVDUZgJP3RjPkjum7Ua5wvWOULroAnyQNQUZePF9erBsJp7aXNVZ6tLia/V7hE+1TGTZfHbdtVHUFtdaRRfgAGsIMqD4XgIs7fCoEjzzCwJ+VHx1Q2Dw3V3zR/AKS2oNZ5AMFuFq286260KSUyevjmfNvg/ZvEfy5sSK7GhiPp1OoUBpGsTQyX26n2vQDf/2pBHGz486wAHv0byIUY3lThUojYMYOrVHr7OHMGu6z+SOabs6EOHuKilqX5elG9VYQmPg6VQgACjPZmwAkHPAa9glYOHyypAbfmLYEggAoTeKDQDcBrOMR9JOY+AZq6A2obHoiMqFHIGEfJtpvSkqQz6QDggA6kCEA4B9g8NwlvEwvPfKkPcP0tDZveS3DFqNbv46sqzTTIHJ9vGSjAy5PhOgGyJrZ236HtQmR2PguUyA9/jtSCGtPdnEG/p3Y5cxKkP2ZxL06b4T2dx1yYvcygBv7K9lO5fee2WE6hSELu6j+oyAqzXf8WwuXot9HPYit/IQC3zetQi2iXCOhTD77jnvLH9LvfwJuhwfqU8z+e6UoCSI1xPS8y8CLNBDoCJg6ZZxAKgeoV8BBlYWRC/vRJezjz4l/QFuiOwua1V9esExSRBvJCl1TmCyR4JUZvaO5ABQPY2ZCwE6vMoMTgNcgDXQU7PNNAfgqQcrmrehJmwK8taIjxU0WwQBICyA1aR6yrysYluWXYoFEAXNEsSbFsF4/EmFhgn0oZSVCIvBO+yWGgNb0gTng4hSHdva9cdjRVrJVJm2abpf/zI2Q4rfwnmmh5Uixyj9Hi3XNmcEtIpiWB99MUTD8gwpdf8LEpHxoy0xNGhbZxHOk+Bu/acZJsRfEr15SNoUc6kAAAAASUVORK5CYII=');
window.plugin.highlightPortal.createIcon(7, 1, 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACWQAAAlkBPoZswQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALZSURBVEiJtdZNSBRhHMfx7zO7VCq1vpf0Dh0CKe2gab50yzRsI28dqkMmvV0igtBTstShS5dQe0OJKCXC7AWNoihTKgjBSy+3sHBFd3XN1535d1Ar3dndWRsfGB6G+T3Ph+c/88yMMnR9Gr83gF1NcygS0xIFLmtwIVxMGYM/h5Q7I8kmFGqbA2wrbCIp/XSkqHPemSsFtuaYJ6cm4NMrW9BQeEs2XHlmnhzog4PrbEFDYV8/vLg/P5G5E9Zsgs8fbUMh2j1evQGaemF8FI5mgX/AFhQWrnhhO1cH8SuhpiIUBSg6gOSUjKq4hLOxoABa2CuZeZBXCr1d8OG5eeb1A2i56pLhwXZgmT3wofMzfWtdxAnU9ep4WutzY8XN4QQXFJRDwAcvm6NOshjcHM7dAw4ndD2Z2b8WWqy4OZxVNNN//2IJXQxuDqevn4W/xgTHgptvp842+NYDve9ihudwgVxxV7UrV0oJMBWSsfUjsaBJpWcMd9V7M9y81JoDdlf8Nxyp7KGw5kBqW0aobvzBcc/4UuHz4VlU7dh9j7iEjVJ+rHOp8L+w5oDalhGVXXyXlclVQFAlppcuFa7NoXKxOWBkFd1lVcqJf/L24ZqG+vg8nunJfEOfvq0Mn9dHzxuHyi6+gyv1ZJhhTvF7n9F2o0A1VMfFgpFVDHsPj7BrX5Cg3k1qRgPQrgwREZ/3mpaUfirKNNbxjM3IkZoA+WXTSte7SFtbD3QAk38yusglEcHi4RS/t8No8oxJIRLuMB7fHBGRMyKyLNxcSkQsV25u5QwPPJVH1wtNV65pyMO+IZW8JgOTN9afWKwqEMSVVsb+yrdUesZCrm4vQul6VyQUwGqJTctu+L0d0uj5Na/UT24Ni0h5tPH/A4fixZqIr39QRJZHGxv5Z89C2ZUrrUzclU8VFPChI56g3s2/T+8SlDpk5cZA34SIuK2MsQtGRJx6cKpRRFZYyf8GHMvc33+eT0QAAAAASUVORK5CYII=');
window.plugin.highlightPortal.createIcon(8, 2, 'iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACTwAAAk8B95E4kAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPVSURBVEiJrdZbaBxVGAfw/zmzOzubzWTjpqnNhV4gPiwUqyY+KEJJRbCgaaWIpCZtEpsmjZcXH7QKfVJp9KlUtK0tlgrGpoI20ocK2XgDHxSlCFvvjbrbSi6bzU5mdnY353w+JBu7990kfxhYdr4zvz0753wzjIhQIG4BGpMQO2cwGy1UVGnqUV/LiqAAoEUwF3ib3vV/RKNsPdBxfjXpKFFj+3DHrufYkQAD84/QxaIwJQjzFyJqImhzXquQvse7qN3jFtl1pWaajhbBXOAdOuX/sAj89yN/eMzAwv8T4cCWiZaFqoc8K/A4v5rk5YhYnvEQG7zehc68BYmgzc3AgsN1t1u0/Ok3Gk41xyGByIlpV3ZtuegKPMgPB7uxP+dk8peEAgDafW7h3KLK6g5vCgCSvyVyjEpQALBVqY3sZR1SyRrqebh60bVdE8alqPPfoZA7tG+yChzwvVCfXBO6IK3DYR46doD6FAGZeaEahTYON9rSkmzu9Kwa/9Z0uFurRM2TtalVo4aw+sM8/HqXPKiasHJWn/WNqYSeuOFxblNl8+hWa8PROxPx7yzlr12/e1aFGsLqv6mE3ygEAkBsNOqkJMH3fH1C3+dN1b+2yXZuVqX9Q1xJ3chcsCVRQ1iHSoEAQAliAJCaXAIoSRBziyz9+fYUbQ6GsA6Feeh4t+xxFgMBQN/rTUXPzarRM7OqNCVL/mpzaUjm2q4J9S5XxgIoOFMD1jNhHjreTaVBAKjerS9uOtEUZxpD9Oysan1lOrRWt2i+tNXKVvJ2JANWXxih4W7ZU/QvzRdaJKQmk5zXKOTY6MgZm7f3rgUEAOZgUFtcUgFH9rZKJ2PiBszeEP3z5mrBdDyoYhf5CHWxzrx9egVdAkNvHaDesu5hMfADfj61DZuPDbD+4NN5YL4M9qwn2IzGV91wn6yDr32Q9Qf3s6cyUQNmzwKMkwepb73AV6pRfXr5a7sOvvYjbOB6522wowrajEnW11f45bYv6Ev+KcZcP9K1nAdvBeCZrNN2HXztQ2xggoj8QOaWcQF4dArTgwysdZwm2GWMadfop6I/IA02oeGoDv29IqVaBHMBHXpboTcHDcDuecSGB+nZhkJwBeDKdQXos0IdyQbwiRc1L+5Bh10IvMDeTzWh4eUyQQCwFbCOUg3/83bszNnhabCZNb6kQz9bJphOvBSaIND397IdSgHwXIXgUoio1PH4qPx4xi92RNvEA/NB+fNMjGJ9ZYwreJRT5Jqi6an7xYPrApaL4hZNXblJt4wYxXrXChJReS/bAuIxC/YGHZ7zq7qHWfkPhFTFuAK9mk0AAAAASUVORK5CYII=');
window.plugin.highlightPortal.createIcon(8, 1, 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACWQAAAlkBPoZswQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANFSURBVEiJtdZbaBRXGMDx/5nY6K6XTeJGjYKX14pGBUVNsoqi9VKzgg+1PmhBoq03KEVKWVFICIov+qCCiRFiW6nJg0ijEq8PXiJVFKSgWClYTEOiu5ts1Gh2Zz4fxkvWuezEbD44LJz9zvzmOzNzzlGGrifp7OgmW6HlKPIK8wT2afCLU5oyom0xFS7KzxKKVDZ0y/TSX7X8MVvdUofY9hZOgFmLYEQe/PcQ7lwCEU+omhH6TQWCrqg9PG8lVDbAMP/HvrtX4KdlkEo6olQ1JqS47KQKBLdkQgE0S8+OgybacBB+XgVP/zGrX7LOEZWqxgQzQie1QPAHL6g9XDDWnNa63XCzCS6fMvuD4x1RNXPBH4wa7Rm1h282gVLw3W6Y/zUs/gaSvXCjyTq6bDVq9tIXjCzI+EwtYUTbYlKKfGgLvxD5u0XSYs9aScvp205UvzLi7RdFZIiI4LVZK95YCVPnwtPHcL4eXr+EHw/BtBL7O6+J+NSfx0qks+M8Tl9JxoqX54voukjPC5HFPrPvwHaz6quNzlV/RuXpFU+ZCpoGXVF402P2tT8xfyd/6V5BPytPh588AEOHsROhfBOMmwTh783/Ht3LPH01ER8eceuS+e1O2LI/PSsRg4rZ8P+/mXFANlX3qPKK6wQKVwApbzBAcQgWroFAEFofw+kjEGv3hHrFs7tJ2OCUV1xXNrj1cwJz7V2wZsCwqon41JnaEul6do5PnrkV1nKgqqFbIvVtUlH9asB6bcRvh6fD71CmlZ5QvuGTCW/+a7Dwj3AflPwx24BeFRj91WDhmgP6PrKHaxrcuegnmQwZerJOGfGOuLp/LccG7Ru50hVt5szROao24nfIsceKQ7BsfYL5K1Ok9FsEi2qAZmWIiIp3HHZB+48XTUE27Opm3oqk0vUWCiccBS4Abz7k6CJ7+7Gd5Rqdz68a9dUv3TYMo6kuISLbRSTX6VpKMh3i+lu5piGnW2OqYFwR0Ot0EfsFxD3cX7jpZShdb3FDATyfGDxP+9njXSKyKtP4gcBWPKSJxNujIjI001jvRxWXaZfw5maBOer2BT8p/RZ9395BmGpr5c9aX4tI2MuYbMGISK6e6v1dRIZ5yX8L3LeWl3TVfJsAAAAASUVORK5CYII=');

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
    var warnmarker = L.marker(data.portal._latlng, {
      icon: window.plugin.highlightPortal.getIcon(d.level, d.team)
    });
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
