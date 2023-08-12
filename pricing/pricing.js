import { decodeJWTAndGetUsername } from '../profile.js'

function ifNotPremium() {
  let access_token = localStorage.getItem('access');

  if (access_token) {
    const url = 'http://localhost:8000/api/token/verify'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth_token: access_token,
      })
    }).then(response => {
      if (!response.ok) {
        // Token verification failed, stay on the login page
        console.log('Token verification failed');
        return Promise.reject("Invalid token");
      }
      return response.json();
    })
      .then(data => {
        let jwt_token = decodeJWTAndGetUsername(access_token)

        if (jwt_token.status === 'member') {
          window.location.href = "/home";
        }
      })
      .catch(error => {
        console.error('Token verification failed:', error);
      });
    }
}

function purchase() {
  
  // api paypal
  axios.get('http://localhost:8000/payments/paypal/subscription')
    .then(response => {
      // Capturar la respuesta exitosa
      const responseData = response.data;
      console.log('Respuesta exitosa:', responseData);

      // Aquí puedes hacer lo que necesites con los datos de la respuesta
    })
    .catch(error => {
      // Capturar los errores
      console.error('Error en la solicitud:', error);
      // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    });
}


document.addEventListener('DOMContentLoaded', () => {

  // No tiene que ser premium, si es, redirigirlo al home
  ifNotPremium();

  // manejar el event listener directamente en el .html?
  let purchaseButton = document.getElementById('paypal-button-container-P-5MC57938GY016445NMTLGJ2Y');

  purchaseButton.addEventListener('click', purchase);

});

