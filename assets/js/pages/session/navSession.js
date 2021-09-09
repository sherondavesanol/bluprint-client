const query = document.querySelector.bind(document);

const token = localStorage.getItem('token');
const isLoggedIn = token;

const isAdmin = localStorage.getItem('isAdmin');

// Nav Menu
const [menuBtn, mobileMenu, navLinks] = [
    query('.menu-btn'), query('#mobile-menu'),
    query('#nav-links')
];

// Mobile Menu Event
menuBtn.addEventListener('click', () => {

    menuBtn.classList.toggle('menu-btn__active');
    mobileMenu.classList.toggle('mobile-menu__active');
});

if (isLoggedIn !== null && isLoggedIn !== undefined) {

    if (isAdmin === 'true') {

        mobileMenu.innerHTML = `
        <a href="../course/courses.html" id="courses" class="col-4 mx-auto my-2">Courses</a>
        <a href="../session/admin.html" id="admin" class="col-4 mx-auto my-2">Admin</a>
        <a href="../user/profile.html" id="profile" class="col-5 mx-auto my-2">View Profile</a>
        <a href="../session/logout.html" id="#mobile-session" class="col-3 mx-auto my-2">Logout</a>
        `;

        navLinks.innerHTML = `
        <a href="../course/courses.html" id="courses">Courses<img src="../../assets/images/caret.png" alt="caret" class="caret"></a>
        <a href="../session/admin.html" id="admin" class="col-4 mx-auto my-2">Admin</a>
        <a href="../user/profile.html" id="profile">Profile</a>
        <a href="../session/logout.html" id="session">Logout</a>
        `;

    } else {
        
        mobileMenu.innerHTML = `
        <a href="../course/courses.html" class="col-4 mx-auto my-2">Courses</a>
        <a href="../user/profile.html" id="profile" class="col-5 mx-auto my-2">View Profile</a>
        <a href="../user/view-cart.html" id="view-cart" class="col-5 mx-auto my-2">Checkout</a>
        <a href="../session/logout.html" id="#mobile-session" class="col-3 mx-auto my-2">Logout</a>
        `;

        navLinks.innerHTML = `
        <a href="../course/courses.html" id="courses">Courses<img src="../../assets/images/caret.png" alt="caret" class="caret"></a>
        <a href="../user/profile.html" id="profile">Profile</a>
        <a href="../user/view-cart.html" id="view-cart">Cart</a>
        <a href="../session/logout.html" id="session">Logout</a>
        `;
    };

} else {

    mobileMenu.innerHTML = `
    <a href="../course/courses.html" class="col-4 mx-auto my-2">Courses</a>
    <a href="../session/login.html" id="#mobile-session" class="col-3 mx-auto my-2">Login</a>
    <a href="./register.html" id="mobile-register" class="col-4 mx-auto my-2">Sign Up</a>
    `;

    navLinks.innerHTML = `
    <a href="../course/courses.html" id="courses">Courses<img src="../../assets/images/caret.png" alt="caret" class="caret"></a>
    <a href="../session/login.html" id="session">Login</a>
    <a href="../session/register.html" id="register">Sign Up</a>
    `;
};