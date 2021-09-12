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

    fetch('https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-user', 
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