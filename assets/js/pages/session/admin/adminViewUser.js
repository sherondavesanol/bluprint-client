if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // User Details
    const [userName, userEmail, userMobile] = [
        query('#user-name'),
        query('#user-email'),
        query('#user-mobile')
    ];

    // User Id
    const params = new URLSearchParams(window.location.search);
    const userId = (params.get('userId'));

    fetch('http://localhost:3000/api/admin/admin-view-user', 
        {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: userId
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log();

            userName.innerText = `${data.firstName} ${data.lastName}`;
            userEmail.innerText = `${data.email}`;
            userMobile.innerText = `${data.mobileNumber}`;

        });

} else {

    window.location.replace('../../index.html');
};


{/* <a href="#" id="setAdmin" class="col-3 mx-2">Set as admin</a>
<a href="#" class="col-3 mx-2">Remove user</a> */}