// User Details
const [userName, userEmail, userMobile] = [
    query('#user-name'),
    query('#user-email'),
    query('#user-mobile')
];

const orderHistory = query('#order-history');

// User Id
const userId = localStorage.getItem('id');

// API Endpoints
const VIEW_PROFILE = 'http://localhost:3000/api/users/profile'
const VIEW_ORDERS = 'http://localhost:3000/api/users/view-orders'

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
}

// Fetch API
fetch(VIEW_PROFILE, viewProfileOptions)
    .then(data => data.json())
    .then(data => {
        
        userName.innerText = `${data.firstName} ${data.lastName}`;
        userEmail.innerText = `${data.email}`;
        userMobile.innerText = `${data.mobileNumber}`;
    });


fetch(VIEW_ORDERS, viewProfileOptions)
    .then(data => data.json())
    .then(data => {

        data.map(order => {
            
            const dateOptions = {
                year: 'numeric', 
                month: '2-digit', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit'
            };

            // Order Details
            const orderId = order._id;

            const purchasedOn = new Date(order.purchasedOn)
                .toLocaleString('en-US', dateOptions);

            const totalAmount = order.totalAmount;

            const courses = order.courses;
            let orderedItems = '';
                courses.map(course => orderedItems += 
                    (`${course.name} $${course.price}<br>`));

            // Create Order Div
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

            orderHistory.appendChild(orderDiv);
        });
    });
// End of view orders fetch