// Course Id
const params = new URLSearchParams(window.location.search);
const id = (params.get('courseId'));

// Form
const [editCourse, courseName, courseCategory, coursePrice, courseDescription, submitBtn] = [
    query('#edit-course'),
    query('#course-name'),
    query('#course-category'),
    query('#course-price'),
    query('#course-description'),
    query('#submit-btn')
];

fetch('https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-course', 
{
    method: "POST",
    headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        id
    })
})
.then(data => data.json())
.then(data => {
    
    courseName.value = data.name;
    courseCategory.value = data.category;
    coursePrice.value = data.price;
    courseDescription.value = data.description;
});

editCourse.addEventListener('submit', (e) => {

    e.preventDefault();

    const [name, category, price, description] = [
        courseName.value,
        courseCategory.value,
        coursePrice.value,
        courseDescription.value,
    ];

    fetch('https://bluprint-api-sdss.herokuapp.com/api/courses/edit-course',
    {
        method: "PUT",
        headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            id,
            name,
            category,
            price,
            description
        })
    })
    .then(data => data.json())
    .then(data => data 
        ? window.location.replace('admin-view-courses.html') 
        : alert('fail'));
});