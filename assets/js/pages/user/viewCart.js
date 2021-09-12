// Cart Container
const cart = query('#cart');

// API Endpoints
const VIEW_CART = 'https://bluprint-api-sdss.herokuapp.com/api/orders/view-cart';
const VIEW_COURSE = 'https://bluprint-api-sdss.herokuapp.com/api/courses/view-course';

// Options
const viewCartOptions = {
    method: 'POST',
    headers: {"Authorization": `Bearer ${token}`}
};

// API
const viewCart = () => {

    return fetch(VIEW_CART, viewCartOptions)
            .then(data => data.json())
            .then(data => data)
};

const ASYNC = async () => {
    
    // Cart Details
    const cartData = await viewCart();

    if (cartData.length > 0) {

        const cartItems = [];
        const itemPrices = [];

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
            .then(data => cartItems.push({itemData: data, addedOn: cartData[i].addedOn}));
        };

        const cartItemDiv = document.createDocumentFragment();
        
        cartItems.map(item => {

            // Cart item details
            const courseId = item.itemData._id;
            const name = item.itemData.name;
            const price = item.itemData.price;
            
            const dateOptions = {
                year: 'numeric', 
                month: '2-digit', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit'
            };
            
            const addedOn = new Date(item.addedOn).toLocaleString('en-US', dateOptions);

            const cartItem = document.createElement('div');

            cartItem.innerHTML = 
                `
                <div class="cart-item p-2 d-flex align-items-center justify-content-between">
                    <div class="item-details col-md-2">
                        <img class="product-img" src="../../assets/images/icon.png">
                    </div>
                    <div class="item-details col-7 col-md-6">
                        <p class="item-name">${name}</p>
                        <small class="item-added-on">${addedOn}</small>
                    </div>
                    <div class="item-details col-3">
                        <p class="item-price fw-900">$${price}</p>
                    </div>
                    <div class="item-details flex-end">
                        <button id="remove-item" value="${courseId}">
                        <img src="../../assets/images/remove-item.png"></button>
                    </div>
                </div>
                `;

            cartItemDiv.appendChild(cartItem);

            // Push item price to itemPrices (for total price)
            itemPrices.push(price);
        });

        cart.appendChild(cartItemDiv);

        // Remove Cart Item
        const removeItemBtns = document.querySelectorAll('#remove-item');
        
        for (let i = 0; i < removeItemBtns.length; i++) {

            removeItemBtns[i].addEventListener("click", function() {

                const courseId = removeItemBtns[i].value;

                fetch('https://bluprint-api-sdss.herokuapp.com/api/orders/delete-cart-item', 
                {
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        courseId
                    })
                })
                .then(data => data.json())
                .then(data => window.location.reload(true));
            });
        };
        
        // Sum of prices in itemPrices container
        let totalPrice = itemPrices.reduce((sum, price) => sum + price, 0);
            totalPrice = parseFloat(totalPrice).toFixed(2);
        
        const appendTotalPrice = () => {
                
            const totalPriceDiv = document.createElement('div');

            totalPriceDiv.innerHTML = 
                `
                <div class="total-price-container mt-4 px-2 px-sm-4 px-md-2 d-flex justify-content-between">
                    <a class="back-to-courses" href="../course/courses.html">
                    Back to Courses</a>
                    <span class="col-2 col-md-5"></span>
                    <p class="col-5 col-md-4">Total:
                    <span class="mx-2 total-price fw-900">$${totalPrice}</span>
                    </p>
                </div>
                <a onClick="checkout()" class="checkout-btn uppercase fw-900 mt-5 mx-auto d-flex justify-content-center">proceed to checkout</a>
                `

            cart.appendChild(totalPriceDiv);
        };

        appendTotalPrice();
    
    } else {

        // Empty container display
        const showEmptyCart = () => {

            const div = document.createElement('div');

            div.innerHTML = `
                            <div>
                            <h3>Your cart is empty.</h3>
                            </div>
                            <a class="back-to-courses col-4 col-md-3 d-block mt-4" href="../course/courses.html">Back to Courses</a>
                            `;

            cart.appendChild(div);   
        };

        showEmptyCart();
    };
    // End of Cart Details

};

ASYNC();