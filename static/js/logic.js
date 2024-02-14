let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

function createMap(earthquakes) {

    // create the tile layer that will be the background of the map.
    let usmap = L.titleLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object to hold the map layer.
    let baseMaps = {
        "Map": usmap
    };

    let overlayMaps = {
        "Earthquakes": earthquakes
    };

    //Create the map object with options.
    let map = L.map("map-id", {
        center: [44.58, 103.46],
        zoom: 1,
        layers: [usmap, earthquakes]
    });

    // Create a layer control, and pass it through baseMaps and overlayMaps. And the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

// Pull the "coordinates" property from the url.features
let magnitude = url.features.mag;

// Define a markerSize() function that will give each earthquake a different radius on its magnitude level.
function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 50;
}

function createMarkers(url) {

    // Pull the "coordinates" property from the url.features
    let coordinates = url.features.coordinates;

    // Initialize an array to hold the earthquake markers and magnitude size.
    let eqMarkers = [];

    // Loop through the earthquake array.
    for (let index = 0; index < coordinates.length; index++) {
        let coordinate = coordinates[index];

        // For each earthquake, create a marker.
        let eqMarker = Lmarker([coordinate.lat, coordinate.lon]); 

        L.circle(eqMarker[index], {
            fillOpacity: 0.75,
            fillColor: "green",
            radius: markerSize(magnitude[index])
        })

        // Add the marker to the eqMarkers array.
        eqMarkers.push(eqMarker);
    }
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then(createMarkers);
