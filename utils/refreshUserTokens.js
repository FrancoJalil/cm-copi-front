

export function refreshUserTokens() {
    const tokensElement = document.getElementById('tokens');
    axios.get('http://localhost:8000/get-user-tokens/', {
    }, {
        headers: {
            'Authorization': 'Bearer ' + String(accessToken)
        }
    })
        .then(response => {

            let userTokens = response.data.user_tokens
            tokensElement.textContent = userTokens

        });
}