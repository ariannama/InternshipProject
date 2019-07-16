const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

fetch("http://localhost:3000/callback/callback", {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        code
    })
});