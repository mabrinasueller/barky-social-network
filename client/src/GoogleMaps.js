// import { Loader } from "@googlemaps/js-api-loader";
// let map;
// const additionalOptions = {};
// const Loader = google.maps.plugins.loader.Loader;
// let secrets;
// if (process.env.NODE_ENV == "production") {
//     secrets = process.env;
// } else {
//     secrets = require("./../../secrets.json")[2].GOOGLE_API;
// }

// export default function Maps() {
//     const loader = new Loader({
//         apiKey: secrets,
//         version: "weekly",
//         ...additionalOptions,
//     });

//     loader
//         .load()
//         .then(() => {
//             new google.maps.Map(document.getElementById("map"), {
//                 center: { lat: 52.520008, lng: 13.404954 },
//                 zoom: 8,
//             });
//         })
//         .catch((error) => {
//             console.log("error: ", error);
//         });

//     return (
//         <div>
//             <div id="map"></div>
//         </div>
//     );
// }

// import {
//     GoogleMap,
//     useLoadScript,
//     Marker,
//     InfoWindow,
// } from "@react-google-maps/api";
// import { formatRelative } from "date-fns";
// import "@reach/combobox/styles.css";

// export default function Maps() {}

import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";

mapboxgl.accessToken =
    "pk.eyJ1IjoibWFicmluYSIsImEiOiJja3BjamRtYmQxYThuMnd0N3FiMGZwbWFmIn0.eN0hbFR1PsOqjXI9CMYXIw";

export default function Maps() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(13.4);
    const [lat, setLat] = useState(52.52);
    const [zoom, setZoom] = useState(15);

    var geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [13.402763, 52.543506],
                },
                properties: {
                    title: "Mapbox",
                    description: "Mauerpark",
                },
            },
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [13.436393, 52.528035],
                },
                properties: {
                    title: "Mapbox",
                    description: "Volkspark Friedrichshain",
                },
            },
        ],
    };

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });
    });

    // geojson.features.forEach(function (marker) {
    //     // create a HTML element for each feature
    //     var el = document.createElement("div");
    //     el.className = "marker";

    //     // make a marker for each feature and add to the map
    //     new mapboxgl.Marker(el)
    //         .setLngLat(marker.geometry.coordinates)
    //         .addTo(map);
    // });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <div ref={mapContainer} className="map-container">
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
        </div>
    );
}
