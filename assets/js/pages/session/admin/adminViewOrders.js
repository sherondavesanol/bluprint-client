if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // Cards
    const ordersBody = query('#orders-body');

    // Get users count
    fetch('http://localhost:3000/api/admin/admin-view-orders',
        {
            method: "GET",
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {

            console.log(data);

            ordersBody.innerHTML = data.map((order) => {

                return   `
                        <tr class="">
                        <td>${order._id}</td>
                        <td><a href="./admin-view-order.html?orderId=${order._id}">View Order</a></td>
                        </tr>
                        `

            }).join('');
        });

} else {

    window.location.replace('../../index.html');
};