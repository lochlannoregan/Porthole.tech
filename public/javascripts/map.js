
if (window.location.pathname.includes("/placePage")){


var lat = document.getElementById("lat").innerHTML;
var long = document.getElementById("long").innerHTML;
var main = document.getElementById("name").innerHTML
var grade = document.getElementById("grade").innerHTML;

var mymap = L.map('mapid').setView([lat, long], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

L.marker([lat, long]).addTo(mymap)
    .bindPopup('' + main + '<br> '+ grade +'')
    .openPopup();
}


