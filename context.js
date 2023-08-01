export function logoutUser() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    // Redireccionar a otra página
    window.location.href = "/login";

}

export let updateToken = async () => {

    

    // chequear si el access está vencido...

    const accessToken = localStorage.getItem('access');

    if (accessToken) {
        url = 'https://mikai.onrender.com/api/token/verify/'

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'token': accessToken })
        });

        if (response.status === 200) {
            // si tiene access token ok, no actualizarlo
            console.log("access ok, no lo refrescamos")
            return;
        } else {
            // si está vencido, actualizarlo

        }
        
    } 


    const ref = localStorage.getItem('refresh');

    if (!ref) {
        logoutUser();
        window.location.href = "/login";
    }

    try {

        let response = await fetch('https://mikai.onrender.com/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': ref })
        });
        let data = await response.json();


        if (response.status === 200) {
            console.log("Update token called");
            // guardar tokens nuevos en local storage
            const newAccessToken = data.access;
            const newRefreshToken = data.refresh;

            // Update the tokens in localStorage
            localStorage.setItem('access', newAccessToken);
            localStorage.setItem('refresh', newRefreshToken);
        } else {
            logoutUser();
        }

    } catch (error) {
        console.error('Error al actualizar los tokens:', error);

    }
}
function startUpdateTokenInterval() {
    updateToken();

    const intervalId = setInterval(updateToken, 240000);

    // Store the interval ID in a variable or element attribute (optional)
    // In case you want to clear the interval manually later
    // For example, you could use `clearInterval(intervalId)` to stop the interval at some point.

    // Example: Store interval ID in an HTML element attribute
    // document.getElementById('myElement').setAttribute('data-interval-id', intervalId);

    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    startUpdateTokenInterval();
    
});

