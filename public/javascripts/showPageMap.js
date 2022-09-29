mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
  center: spot.geometry.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  };
}
map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});

new mapboxgl.Marker()
  .setLngLat(spot.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({
      offset: 25
    })
    .setHTML(
      `<h5>${spot.title}</h5><p>${spot.location}</p>`
    )
  )
  .addTo(map)