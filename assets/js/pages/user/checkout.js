// API Endpoints
const CREATE_ORDER = 'https://bluprint-api-sdss.herokuapp.com/api/orders/create-order';
const CLEAR_CART = 'https://bluprint-api-sdss.herokuapp.com/api/orders/clear-cart';

// Checkout
const checkout = async () => {
    
    const cartData = await viewCart();
    const cartItems = [];

    for (let i = 0; i < cartData.length; i++) {

        await fetch(VIEW_COURSE, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: cartData[i].courseId})
        })
        .then(data => data.json())
        .then(data => cartItems.push(data));
    };

    const courses = [];
    const itemPrices = [];

    cartItems.map(item => {

        const courseId = item._id;
        const name = item.name;
        const price = item.price;

        const course = {courseId, name, price}

        courses.push(course);

        itemPrices.push(price);
    });

    const userId = localStorage.getItem('id');

    let totalAmount = itemPrices.reduce((sum, price) => sum + price, 0);
        totalAmount = parseFloat(totalAmount).toFixed(2);

    // Create Order
    await fetch(CREATE_ORDER, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            courses,
            totalAmount,
            purchasedOn: Date()
        })
    })
    .then(data => data.json())
    .then(data => alert('done'));

    // Clear Cart
    await fetch(CLEAR_CART, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId
        })
    })
    .then(data => data.json())
    .then(data => window.location.reload(true));
};