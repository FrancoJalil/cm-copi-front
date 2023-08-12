

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

  // manejar el event listener directamente en el .html?
  let purchaseButton = document.getElementById('paypal-button-container-P-5MC57938GY016445NMTLGJ2Y');

  purchaseButton.addEventListener('click', purchase);

});

