if (localStorage.getItem('isAdmin') === 'true') {

    // Order Details
    const orderDetails = query('#order-details');

    // Order Id
    const params = new URLSearchParams(window.location.search);
    const orderId = (params.get('orderId'));

    // API Endpoints
    const VIEW_ORDER = 'https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-order'

    // Options
    const viewOrderOptions = {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            id: orderId
        })
    }

    fetch(VIEW_ORDER, viewOrderOptions)
        .then(data => data.json())
        .then(order => {
            
            // Order Details
            const orderId = order._id;

            const dateOptions = {
                year: 'numeric', 
                month: '2-digit', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit'
            };
            
            const purchasedOn = new Date(order.purchasedOn)
                .toLocaleString('en-US', dateOptions);
        
            const totalAmount = order.totalAmount;
        
            const courses = order.courses;
            let orderedItems = '';
                courses.map(course => orderedItems += 
                    (`${course.name} $${course.price} <br>`));
    
            const orderDiv = document.createElement('div');

            orderDiv.innerHTML = 
                `
                <div class="order my-3 p-4 row mx-auto justify-content-between">
                    <div class="col-md-6 order-detail d-flex flex-column">
                        <p class="order-property uppercase fw-600">Order ID</p>
                        <p class="order-info mt-1">${orderId}</p>
                    </div>
                    <div class="col-md-6 order-detail d-flex flex-column mt-3 mt-md-0">
                        <p class="order-property uppercase fw-600">Date Purchased</p>
                        <p class="order-info mt-1">${purchasedOn}</p>
                    </div>
                    <div class="col-md-6 order-detail d-flex flex-column mt-3 mt-md-4">
                        <p class="order-property uppercase fw-600">Ordered Items</p>
                        <p class="order-info mt-1">${orderedItems}</p>
                    </div>
                    <div class="col-md-6 order-detail d-flex flex-column mt-3 mt-md-4">
                        <p class="order-property uppercase fw-600">Total Amount</p>
                        <p class="order-info mt-1">$${totalAmount}</p>
                    </div>
                </div>
                `;

            orderDetails.appendChild(orderDiv);
        });

} else {

    window.location.replace('../../index.html');
};