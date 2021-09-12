// Course Cards
const courseCards = query('#course-cards');

// Get courses count
fetch('https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-courses',
    {
        method: "GET",
        headers: {"Authorization" : `Bearer ${token}`}
    })
    .then(data => data.json())
    .then(data => {

        courseCards.innerHTML = data.map((course) => {

            return   `
                    <div class="glass course-card my-3 p-4 text-center d-flex flex-column">
                    <img src="../../assets/images/course-img.jpg" alt="course-img" class="course-img col-12">
                    <p class="course-name mt-4">${course.name}</p>
                    <p class="course-category mt-3">${course.category}</p>
                    <p class="course-price">$${course.price}</p>
                    <a href="./view-course.html?courseId=${course._id}" class="mt-4">View Course</a>
                    </div>
                    `
                    
        }).join('');
    });
