
const refreshTokenEndpoint = 'http://localhost:8000/api/token/refresh/';
let accessToken = localStorage.getItem('access');
let refreshToken = localStorage.getItem('refresh');

console.log("a",accessToken)
console.log("r", refreshToken)

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    try {
      const response = await fetch(refreshTokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      });
  
      if (!response.ok) {
        throw new Error('No se pudo refrescar el token.');
      }
  
      const data = await response.json();
      console.log("dd", data)

      console.log("access", data.access);
      console.log("refresh", data.refresh);
  
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
  
      accessToken = data.access;
      refreshToken = data.refresh;
      return data.access;
    } catch (error) {
      throw new Error('Error al refrescar el token.');
    }
  }

// Axios interceptor to handle expired tokens
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("axios interceptó token expirado");
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return refreshAccessToken().then((token) => {
                console.log("refrescando");
                
                originalRequest.headers.Authorization = `Bearer ${token}`; // + String(token)?
                return axios(originalRequest);
            });
        }

        return Promise.reject(error);
    }
);

/* Example usage
async function example() {
    try {
        const response = await axios.get('http://localhost:8080/example_endpoint');
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
}

example();
*/