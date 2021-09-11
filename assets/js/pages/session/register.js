// Form
const [registerUser, fNameInput, lNameInput, mobileNoInput, emailInput, password1Input, password2Input, submitBtn] = [
    query('#register-user'),
    query('#fName'),
    query('#lName'),
    query('#mobileNo'),
    query('#email'),
    query('#password1'),
    query('#password2'),
    query('#submit-btn'),
];

registerUser.addEventListener('submit', (e) => {

    e.preventDefault();

    const [fName, lName, mobileNo, email, password, password2] = [
        fNameInput.value,
        lNameInput.value,
        mobileNoInput.value,
        emailInput.value,
        password1Input.value,
        password2Input.value
    ];


    if ([fName, lName, mobileNo, email, password, password2].some(value => value === "")) {
        alert('Please complete all the required fields.');
    } else {

        if (mobileNo.length < 11) {
            alert('Please input correct mobile number.');
        } else {

            if (password !== password2) {
                alert('Passwords does not match!');
            } else {

                if ([password, password2].some(value => value.length < 8)) {
                    alert('Password must be at least 8 characters.');
                } else {

                    fetch('http://localhost:3000/api/users/check-email',
                    {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify({
                            email: email
                        })
                    })
                    .then(data => data.json())
                    .then(data => { if(data === false) {
                        
                        fetch('http://localhost:3000/api/users/register',
                        {
                            method: "POST",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify({
                                firstName: fName,
                                lastName: lName,
                                mobileNumber: mobileNo,
                                email: email,
                                password: password
                            })
                        })
                        .then(data => data.json())
                        .then(data => data ? window.location.replace('login.html') : alert('fail'))

                        } else {
                            alert('email already exists!');
                        }
                    });
                };
            };
        };
    };
});