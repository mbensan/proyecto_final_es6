import {Veloster, Lancer, Impreza, Gol, Rio3} from './vehiculos.js'

const modal = M.Modal.init(document.getElementById('modal1'), {});
//modal.open();
(function init() {
  $('select').formSelect();
  $("select[required]").css({
    display: "inline",
    height: 0,
    padding: 0,
    width: 0
  });
})();

const fetch_data = function(origen_coords, destino_coords, origen_name, destino_name, vehicle) {
  fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origen_coords}&destinations=${destino_coords}&key=AIzaSyAlDSRLGoUqLzoFZQlR7wvyRoNdsufoQls`)
    .then(
      datos => datos.json()
    )
    .then(function(datos) {
      // Acá recién puedo ocupar los datos
      const consumo = vehicle.get_consumo(datos.rows[0].elements[0].distance.value / 1000);
      const distance = datos.rows[0].elements[0].distance.text;
      const duration = datos.rows[0].elements[0].duration.text;
      document.getElementById('trip_resume').innerHTML = `Conducir desde ${origen_name} hasta ${destino_name} le tomará ${duration}
        recorrer los ${distance}, consumiendo un total de ${consumo.toFixed(2)} litros de bencina`;
      modal.open();
    })
    .catch(function(error) {
      alert(`Error: ${error}`);
    });
}

document.getElementById('distance-form').addEventListener('submit', function(ev) {
  ev.preventDefault();
  
  const origen = document.getElementById('origen');
  const destino = document.getElementById('destino');

  const vehicle_name = document.getElementById('vehicle').value;
  const origen_coords = origen.value;
  const origen_name = origen.options[origen.selectedIndex].innerHTML;
  const destino_coords = destino.value;
  const destino_name = destino.options[destino.selectedIndex].innerHTML;

  let vehicle;
  if (vehicle_name == 'veloster') { vehicle = new Veloster(); }
  else if (vehicle_name == 'lancer') { vehicle = new Lancer(); }
  else if (vehicle_name == 'impreza') { vehicle = new Impreza(); }
  else if (vehicle_name == 'gol') { vehicle = new Gol(); }
  else { vehicle = new Rio3(); }

  if (origen_coords == 'actual') {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch_data(`${pos.coords.latitude},${pos.coords.longitude}`, destino_coords, origen_name, destino_name, vehicle);
    });
  } else {
    fetch_data(origen_coords, destino_coords, origen_name, destino_name, vehicle);
  }
});
