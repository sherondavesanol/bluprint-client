const query = document.querySelector.bind(document);

const token = localStorage.getItem('token');
const isLoggedIn = token;

const isAdmin = localStorage.getItem('isAdmin');

// Nav Menu
const [menuBtn, mobileMenu, navLinks] = [
    query('.menu-btn'), 
    query('#mobile-menu'),
    query('#nav-links')
];

// Mobile Menu Event
menuBtn.addEventListener('click', () => {

    menuBtn.classList.toggle('menu-btn__active');
    mobileMenu.classList.toggle('mobile-menu__active');
});

// Check Cart Count
const checkCartCount = () => {
    
    return fetch('http://localhost:3000/api/orders/view-cart', 
            {
                method: 'POST',
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(data => data.json())
            .then(data => data.length);
};

// Set Nav Links
const navSession = async () => {
    
    if (isLoggedIn) {

        if (isAdmin === 'true') {

            query('#logo-link').setAttribute('href', '../session/admin/admin.html');
            
            mobileMenu.innerHTML = 
                `
                <a href="../pages/course/courses.html" id="courses" class="col-4 mx-auto my-2">Courses</a>
                <a href="../session/admin/admin.html" id="admin" class="col-4 mx-auto my-2">Admin</a>
                <a href="../session/logout.html" id="#mobile-session" class="col-3 mx-auto my-2">Logout</a>
                `;
        
            navLinks.innerHTML = 
                `
                <a href="../course/courses.html" id="courses">Courses<img src="../../assets/images/caret.png" alt="caret" class="caret"></a>
                <a href="../session/admin/admin.html" id="admin" class="col-4 mx-auto my-2">Admin</a>
                <a href="../session/logout.html" id="session">Logout</a>
                `;

        } else {

            query('#logo-link').setAttribute('href', '../user/user.html');
            
            // Set Cart Count
            const setCartCount = async () => {

                let cartCount = await checkCartCount();
                
                cartCount < 1 ? cartCount : 0;

                mobileMenu.innerHTML = `
                <a href="../course/courses.html" class="col-4 mx-auto my-2">Courses</a>
                <a href="../user/profile.html" id="profile" class="col-5 mx-auto my-2">View Profile</a>
                <a href="../user/view-cart.html" id="view-cart" class="col-5 mx-auto my-2">View Cart (${cartCount})</a>
                <a href="../session/logout.html" id="#mobile-session" class="col-3 mx-auto my-2">Logout</a>
                `;

                navLinks.innerHTML = `
                <a href="../course/courses.html" id="courses">Courses<img src="../../assets/images/caret.png" alt="caret" class="caret"></a>
                <a href="../user/profile.html" id="profile">Profile</a>
                <a href="../user/view-cart.html" id="view-cart">Cart(${cartCount})</a>
                <a href="../session/logout.html" id="session">Logout</a>
                `;
            };

            setCartCount();
        };

    } else {

        mobileMenu.innerHTML = 
            `
            <a href="../course/courses.html" class="col-4 mx-auto my-2">Courses</a>
            <a href="../session/login.html" id="#mobile-session" class="col-3 mx-auto my-2">Login</a>
            <a href="./register.html" id="mobile-register" class="col-4 mx-auto my-2">Sign Up</a>
            `;

        navLinks.innerHTML = 
            `
            <a href="../course/courses.html" id="courses">Courses<img src="../../assets/images/caret.png" alt="caret" class="caret"></a>
            <a href="../session/login.html" id="session">Login</a>
            <a href="../session/register.html" id="register">Sign Up</a>
            `;
    };
};

navSession();