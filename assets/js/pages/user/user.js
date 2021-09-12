// Banner Text
const bannerText = query('#banner-text');

// User Id
const userId = localStorage.getItem('id');

// API Endpoints
const VIEW_PROFILE = 'https://bluprint-api-sdss.herokuapp.com/api/users/profile'

// Options
const viewProfileOptions = {
    method: "POST",
    headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        id: userId
    })
};

// Fetch API
fetch(VIEW_PROFILE, viewProfileOptions)
    .then(data => data.json())
    .then(data => {
        
        const name = data.firstName;
        
        bannerText.innerText = `welcome back, ${name}!`;
    });