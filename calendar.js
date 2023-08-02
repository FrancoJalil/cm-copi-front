

document.addEventListener('DOMContentLoaded', () => {
  // Llamada a la API y procesamiento de datos como en tu código anterior...
  let access_token_g = localStorage.getItem('access');
  console.log("vvv", access_token_g)

  axios.get('http://localhost:8000/image-generation/get_saved_images', {
    headers: {
      'Authorization': 'Bearer ' + String(access_token_g)
    }

  })
    .then(response => {

      const data = response.data;
      console.log("DATA", data);
      const containerDad = document.getElementById('content-container');

      // Creamos un contador para generar IDs únicos
      //let carrusel.id = 1;

      data.forEach(carrusel => {
        const continerOfGenerateds = document.createElement('div');
        continerOfGenerateds.id = 'container-of-generateds' + carrusel.id;
        continerOfGenerateds.classList.add('container-of-generateds');
        containerDad.appendChild(continerOfGenerateds);

        const containerCalendar = document.createElement('div');
        containerCalendar.id = 'container-calendar' + carrusel.id;
        containerCalendar.classList.add('container-calendar');
        continerOfGenerateds.appendChild(containerCalendar);

        const containerContentCalendar = document.createElement('div');
        containerContentCalendar.id = 'container-content-calendar' + carrusel.id;
        containerContentCalendar.classList.add('container-content-calendar');
        containerCalendar.appendChild(containerContentCalendar);

        const fechaText = document.createElement('h3');
        fechaText.textContent = 'Fecha de creación:'
        fechaText.classList.add('fecha-publicacion');
        fechaText.id = 'fechatext' + carrusel.id;
        containerContentCalendar.appendChild(fechaText);

        const fecha = document.createElement('h3');
        fecha.textContent = carrusel.created_at;
        fecha.id = 'fecha' + carrusel.id;
        containerContentCalendar.appendChild(fecha);

        let imagesCarrusel = carrusel.images;
        const div = document.createElement('div');
        div.classList.add('images-container');

        imagesCarrusel.forEach((image) => {

          const img = document.createElement('img');
          img.src = image.image_url;
          div.appendChild(img)
          containerCalendar.appendChild(div);
        });


        // Incrementamos el contador para el siguiente carrusel
        //carrusel.id++;
      });
    })
    .catch(error => {
      console.error('Error fetching saved images:', error);
    });
});
