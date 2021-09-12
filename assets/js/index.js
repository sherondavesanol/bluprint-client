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

    // Nav Session
    mobileMenu.innerHTML = 
        `
        <a href="pages/session/login.html" id="#mobile-session" class="col-3 mx-auto my-2">Login</a>
        <a href="pages/session/register.html" id="mobile-register" class="col-4 mx-auto my-2">Sign Up</a>
        `;

    navLinks.innerHTML = 
        `
        <a href="pages/session/login.html" id="session">Login</a>
        <a href="pages/session/register.html" id="register">Sign Up</a>
        `;