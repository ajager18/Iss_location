let i =1;
let lat=0;
let lon=0;


	fetch('http://api.open-notify.org/iss-now.json').then(res=>res.json())
	.then(geo=>{lat=geo.iss_position.latitude;lon=geo.iss_position.longitude;})
	var mymap = L.map('mapid').setView([lat, lon], 5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VybmVsMzEiLCJhIjoiY2tmMnpqd2VtMTdjazJxcGhhYjlmczR4bSJ9.KKtK-LZdugqOApL8C9dFQg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marker = L.marker([lat,lon]).addTo(mymap);
var circle = L.circle ([lat,lon],{
	color: 'green',
	fillColor: '#f02',
	radius: 1500
}).addTo(mymap);

const move = () => {
	fetch('http://api.open-notify.org/iss-now.json').then(res=>res.json())
	.then(geo=>{lat=geo.iss_position.latitude;lon=geo.iss_position.longitude;})
	let latlongs = [
	[lat,lon],
	[lat+1,lon+1],
	[lat+2,lon+2]]
	let line = L.polyline(latlongs,{color:'green'}).addTo(mymap);	
	setTimeout(function () {mymap.panTo([lat,lon]);marker.setLatLng([lat,lon]);circle.setLatLng([lat,lon]);line;i++;if (i>0){
		move()
	}},5000)
}

move();