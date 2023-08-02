
const refreshTokenEndpoint = 'http://localhost:8000/api/token/refresh/';
let accessToken = localStorage.getItem('access');
let refreshToken = localStorage.getItem('refresh');


// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    const { data: { access: newAccessToken, refresh: newRefreshToken } } = await axios.post(refreshTokenEndpoint, {
        refresh: refreshToken
    });
    console.log("access", newAccessToken);
    console.log("refresh", newRefreshToken);
    localStorage.setItem('access', newAccessToken);
    localStorage.setItem('refresh', newRefreshToken);

    accessToken = newAccessToken;
    refreshToken = newRefreshToken;
    return newAccessToken;
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
                

                originalRequest.headers.Authorization = `Bearer ${String(token)}`; // + String(token)?
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