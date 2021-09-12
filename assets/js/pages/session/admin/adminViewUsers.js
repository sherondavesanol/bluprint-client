if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // Cards
    const usersBody = query('#users-body');

    // Get users count
    fetch('https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-users',
        {
            method: "GET",
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {

            usersBody.innerHTML = data.map((user) => {

                return   `
                        <tr class="">
                        <td>${user.firstName} ${user.lastName}</td>
                        <td><a href="./admin-view-user.html?userId=${user._id}">View User</a></td>
                        </tr>
                        `

            }).join('');
        });

} else {

    window.location.replace('../../index.html');
};