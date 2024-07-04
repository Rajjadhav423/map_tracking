// const socket=io()

// if(navigator.geolocation){
//     navigator.geolocation.watchPosition((position)=>{
//     const {latitude,longitude}=position.coords;
 
//     socket.emit("send-location",{latitude,longitude})

//     },(error)=>{
//         console.error(error)
//     })
// }

// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;

//         socket.emit("send-location", { latitude, longitude });
//     }, (error) => {
//         console.error(error);
//     },
//     {
//         enableHighAccuracy:true,
//         timeout:5000,
//         maximumAge:0;
//     }

// );
// } else {
//     console.log("Geolocation is not supported by this browser.");
// // }


// if (navigator.geolocation) {
//     const options = {
//         enableHighAccuracy: true,
//         timeout: 5000, // Maximum time to wait for a position
//         maximumAge: 0 // Do not use a cached position
//     };

//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;

//         socket.emit("send-location", { latitude, longitude });
//     }, (error) => {
//         console.error(error);
//     }, options);
// } else {
//     console.log("Geolocation is not supported by this browser.");
// }



// const map=L.map("map").setView([0,0],10)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Rajesh Jadhav'
// }).addTo(map);


// const markers={};

// socket.on("receive-location",(data)=>{
//     const {id,latitude,longitude}=data;
//     map.setView([latitude,longitude]);
//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]); // Corrected typo from setLatLang to setLatLng
//     } else {
//         markers[id] = L.marker([latitude, longitude]).addTo(map); // Corrected typo from L.markers to L.marker
//     }
// })

// socket.on("user-disconnect",(id)=>{
//     if(markers[id]){
//         map.removeLayer(markers[id])
//         delete markers[id]
//     }
// })








const socket = io();

if (navigator.geolocation) {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
        console.error(error);
    }, options);
} else {
    console.log("Geolocation is not supported by this browser.");
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Rajesh Jadhav'
}).addTo(map);



const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 16);

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnect", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});




// const socket = io();

// // Initialize the map
// const map = L.map("map").setView([0, 0], 10);

// // Add OpenStreetMap tiles to the map
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '© OpenStreetMap contributors'
// }).addTo(map);

// // Object to store markers by socket.id
// const markers = {};

// // Function to add or update markers on the map
// function addOrUpdateMarker(id, latitude, longitude) {
//     if (markers[id]) {
//         markers[id].setLatLng([latitude, longitude]);
//     } else {
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
//     }
// }

// // Function to remove markers from the map
// function removeMarker(id) {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// }

// // Handle receiving location updates from the server
// socket.on("receive-location", (data) => {
//     const { id, latitude, longitude } = data;
//     addOrUpdateMarker(id, latitude, longitude);
// });

// // Handle disconnection events from the server
// socket.on("user-disconnect", (id) => {
//     removeMarker(id);
// });

// // Watch for geolocation updates and emit them to the server
// if (navigator.geolocation) {
//     const options = {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//     };

//     navigator.geolocation.watchPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         socket.emit("send-location", { latitude, longitude });
//     }, (error) => {
//         console.error(error);
//     }, options);
// } else {
//     console.log("Geolocation is not supported by this browser.");
// }
