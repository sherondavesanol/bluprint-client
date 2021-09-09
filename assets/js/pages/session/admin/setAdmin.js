// User Id
const params = new URLSearchParams(window.location.search);
const userId = (params.get('userId'));

// Set user as admin
const setAdmin = () => {'click', 
    
    fetch('http://localhost:3000/api/admin/set-admin', 
        {
            method: "PUT",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: userId
            })
        })
        .then(data => data.json())
        .then(data => data
                ? window.location.replace('../admin/admin.html')
                : alert('error occured')
        );
};