function goLoginPricing() {

    localStorage.clear();
    window.location.href = "/login?next=pricing";

}

document.addEventListener('DOMContentLoaded', () => {

    // proteger ruta
    let accessToken = localStorage.getItem('access');

    if (!accessToken) {
        // user no logeado... llevarlo al login con el ?next=pricing
        goLoginPricing();
    }

    // verificar access valido
    let url = 'http://localhost:8000/api/token/verify/';
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: accessToken,
        })
      })
        .then(response => {
            if (response.ok) {
                // TODO OK
            } else {
                // LOGEARLO
                goLoginPricing();
            }
        })
        .catch(error => {
            console.error('Error en la verificación del token:', error);
            // LOGEARLO
            goLoginPricing();
            
          });

    let getStartedButton = document.getElementById('purchaseButton');

    getStartedButton.addEventListener('click', getStartedFlux);
});
