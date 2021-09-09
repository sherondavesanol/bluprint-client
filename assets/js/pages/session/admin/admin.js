if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // Cards
    const [usersCard, coursesCard, adminCard] = [

        query('#users-card'),
        query('#courses-card'),
        query('#admin-card')
    ];

    // Get users count
    fetch('http://localhost:3000/api/admin/stats/users-count',
        {
            method: "GET",
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {
            
            usersCard.innerHTML =   `
            <p class="count col-6 text-center my-auto fw-600">${data.length}</p>
            <p class="label col-6 my-auto fw-400">Users</p>
            `
        });

    // Get courses count
    fetch('http://localhost:3000/api/admin/stats/courses-count',
    {
        method: "GET",
        headers: {"Authorization" : `Bearer ${token}`}
    })
    .then(data => data.json())
    .then(data => {
        
        coursesCard.innerHTML =   `
        <p class="count col-6 text-center my-auto fw-600">${data.length}</p>
        <p class="label col-6 my-auto fw-400">Courses</p>
        `
    });

    // Get admin count
    fetch('http://localhost:3000/api/admin/stats/admin-count',
        {
            method: "GET",
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {
            
            adminCard.innerHTML =   `
            <p class="count col-6 text-center my-auto fw-600">${data.length}</p>
            <p class="label col-6 my-auto fw-400">Admins</p>
            `
        });


} else {

    window.location.replace('../../index.html');
};