export function logoutUser() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    // Redireccionar a otra página
    window.location.href = "/login.html";

}

export let updateToken = async () => {

    console.log("Update token called")

    const ref = localStorage.getItem('refresh');

    if (!ref) {
        logoutUser();
        window.location.href = "/login.html";
    }

    try {

        let response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': ref })
        });
        let data = await response.json();


        if (response.status === 200) {
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
    updateToken(); // Call the updateToken function immediately

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

