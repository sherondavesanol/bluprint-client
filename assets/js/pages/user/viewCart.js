// API Endpoints
const VIEW_CART = 'http://localhost:3000/api/orders/view-cart';
const VIEW_COURSE = 'http://localhost:3000/api/courses/view-course';

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
    
    // Cart Container
    const cart = query('#cart');
    
    // Cart Details
    const cartData = await viewCart();

    if (cartData.length > 0) {
        
        const courseData = cartData.map(data => data);

        const cartItems = [];
        const itemPrices = [];

        for (let i = 0; i < courseData.length; i++) {

            await fetch(VIEW_COURSE, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: courseData[i].courseId})
            })
            .then(data => data.json())
            .then(data => cartItems.push({itemData: data, addedOn: courseData[i].addedOn}));
        };
        
        cartItems.map(item => {

            // Cart item details
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

            // Append cart item to cart container
            const appendCartItem = () => {
                
                const cartItemDiv = document.createElement('div');

                cartItemDiv.innerHTML = 
                    `
                    <div class="cart-item pb-1 my-2 d-flex align-items-center justify-content-between">
                        <div class="item-details">
                            <a class="item-image" href="#">
                            image</a>
                        </div>
                        <div class="item-details col-7">
                            <p class="item-name">${name}</p>
                            <small class="item-added-on">${addedOn}</small>
                        </div>
                        <div class="item-details col-4">
                            <p class="item-price fw-900">$${price}.00</p>
                        </div>
                        <div class="item-details flex-end">
                            <a class="remove-item" href="#">
                            <img src="../../assets/images/remove-item.png"></a>
                        </div>
                    </div>
                    `;

                cart.appendChild(cartItemDiv);
            };

            appendCartItem();

            // Push item price to itemPrices (for total price)
            itemPrices.push(price);
        });
        
        // Sum of prices in itemPrices container
        let totalPrice = itemPrices.reduce((sum, price) => sum + price, 0);
            totalPrice = parseFloat(totalPrice).toFixed(2);
        
        const appendTotalPrice = () => {
                
            const totalPriceDiv = document.createElement('div');

            totalPriceDiv.innerHTML = 
                `
                <div class="total-price-container mt-4 d-flex justify-content-between">
                    <a class="back-to-courses col-7" href="../course/courses.html">Back to Courses</a>
                    <p class="total col-2">Total:</p>
                    <p class="total-price col-3 fw-900">$${totalPrice}</p>
                </div>
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
                            <p>Your cart is empty.</p>
                            </div>
                            `;

            cart.appendChild(div);   
        };

        showEmptyCart();
    };
    // End of Cart Details

};

ASYNC();