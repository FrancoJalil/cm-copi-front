function decodeJWTAndGetUsername(jwtToken) {
    // In a real application, use the jsonwebtoken library to decode the JWT
    // Replace this with the actual JWT decoding logic for your application
    var decoded = jwtToken.split(".");

    var jwt_decoded = JSON.parse(atob(decoded[1]))
    console.log(jwt_decoded)
    return jwt_decoded.email;
  }





document.addEventListener('DOMContentLoaded', () => {

    // extraer data jwt aquí
    const accessToken = localStorage.getItem('access');
    console.log(accessToken)
    // Decodificar el token utilizando jwt-decode
    const decodedToken = decodeJWTAndGetUsername(accessToken);

    console.log(decodedToken)

});