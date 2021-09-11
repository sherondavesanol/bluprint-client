const addToCart = () => {


    // Check cart items
    fetch('http://localhost:3000/api/orders/check-cart-items', 
    {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            courseId
        })
    })
    .then(data => data.json())
    .then(data => {

        if (data === false) {

        // Add to cart
        fetch('http://localhost:3000/api/orders/add-to-cart', 
        {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                courseId,
                addedOn: Date()
            })
        })
        .then(data => data.json())
        .then(data => data 
            ? alert ('Item added to cart!')
            : alert ('fail'))

        } else {

            alert('Item is already added to cart.')
        };
    });
};