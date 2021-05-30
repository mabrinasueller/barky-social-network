import { Loader } from "@googlemaps/js-api-loader";
// let map;
const additionalOptions = {};
// const Loader = google.maps.plugins.loader.Loader;
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./../../secrets.json")[2].GOOGLE_API;
}

export default function Maps() {
    const loader = new Loader({
        apiKey: secrets,
        version: "weekly",
        ...additionalOptions,
    });

    loader
        .load()
        .then(() => {
            new google.maps.Map(document.getElementById("map"), {
                center: { lat: 52.520008, lng: 13.404954 },
                zoom: 8,
            });
        })
        .catch((error) => {
            console.log("error: ", error);
        });

    return (
        <div>
            <div id="map"></div>
        </div>
    );
}

// import {
//     GoogleMap,
//     useLoadScript,
//     Marker,
//     InfoWindow,
// } from "@react-google-maps/api";
// import { formatRelative } from "date-fns";
// import "@reach/combobox/styles.css";

// export default function Maps() {}
