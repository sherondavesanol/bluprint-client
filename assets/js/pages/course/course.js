// Course Id
const params = new URLSearchParams(window.location.search);
const courseId = (params.get('courseId'));

// Header
const courseNameHeader = query('#course-name-header');

// Course Details
const [courseName, courseCategory, courseDescription, coursePrice] = [
    query('#course-name'),
    query('#course-category'),
    query('#course-description'),
    query('#course-price')
];

// Course Buttons
const courseButtons = query('#course-buttons');

fetch('https://bluprint-api-sdss.herokuapp.com/api/courses/view-course', 
{
    method: "POST",
    headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        id: courseId
    })
})
.then(data => data.json())
.then(data => {

    courseName.innerText = `${data.name}`;
    courseCategory.innerText = `${data.category}`;
    courseDescription.innerText = `${data.description}`;
    coursePrice.innerText = `$${data.price}`;

    courseButtons.innerHTML = 

        `
        <a onClick="addToCart()" class="btn btn-primary mt-4">Add to Cart</a>
        `
});