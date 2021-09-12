// Form
const [createCourse, courseName, coursePrice, courseCategory, courseDescription, submitBtn] = [
    query('#create-course'),
    query('#courseName'),
    query('#coursePrice'),
    query('#courseCategory'),
    query('#courseDescription'),
    query('#submit-btn'),
];

createCourse.addEventListener('submit', (e) => {

    e.preventDefault();

    const [name, price, category, description] = [
        courseName.value,
        coursePrice.value,
        courseCategory.value,
        courseDescription.value
    ];

    fetch('https://bluprint-api-sdss.herokuapp.com/api/courses/check-course-name',
    {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({name})
    })
    .then(data => data.json())
    .then(data => { if(data !== true) {

        fetch('https://bluprint-api-sdss.herokuapp.com/api/courses/create-course',
        {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name,
                price,
                category,
                description,
                createdOn: Date()
            })
        })
        .then(data => data.json())
        .then(data => data ? window.location.replace('admin-view-courses.html') : alert('Fail'))

        } else {
            alert('Course name already exists!');
        };
    });
});