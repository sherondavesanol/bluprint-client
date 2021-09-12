// Form
const [registerUser, emailInput, passwordInput, submitBtn] = [
    query('#register-user'),
    query('#email'),
    query('#password'),
    query('#submit-btn')
];

registerUser.addEventListener('submit', (e) => {

    e.preventDefault();

    const [email, password] = [
        emailInput.value,
        passwordInput.value
    ];


    if ([email, password].some(value => value === "")) {

        alert('Please complete all the required fields.');

    } else {

        fetch('https://bluprint-api-sdss.herokuapp.com/api/users/login',
        {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(data => data.json())
        .then(data => {

            if (data.error) {

                alert(data.error);
                
            } else {

                localStorage.setItem('token', data.access);

                const token = data.access;

                if (token) {

                    fetch('https://bluprint-api-sdss.herokuapp.com/api/users/user-details',
                        {
                            method: "GET",
                            headers: {"Authorization" : `Bearer ${token}`}
                        }
                    )
                    .then(data => data.json())
                    .then(data => {
                        
                        localStorage.setItem('id', data._id);
                        localStorage.setItem('isAdmin', data.isAdmin);

                        const isAdmin = data.isAdmin;

                        isAdmin 
                            ? window.location.replace('admin/admin.html')
                            : window.location.replace('../user/user.html')
                    });
                };
            };
        });
    };
});