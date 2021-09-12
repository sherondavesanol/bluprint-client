if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // Course Details
    const [courseName, courseCategory, courseDescription, coursePrice] = [
        query('#course-name'),
        query('#course-category'),
        query('#course-description'),
        query('#course-price')
    ];

    // Course Buttons
    const courseButtons = query('#course-buttons');

    // Course Id
    const params = new URLSearchParams(window.location.search);
    const courseId = (params.get('courseId'));

    fetch('https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-course', 
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

            console.log(data);

            courseName.innerText = `${data.name}`;
            courseCategory.innerText = `${data.category}`;
            courseDescription.innerText = `${data.description}`;
            coursePrice.innerText = `${data.price}`;

            courseButtons.innerHTML = 

                `
                <a href="./admin-edit-course.html?courseId=${courseId}" class="btn btn-primary mt-4">Edit Course</a>
                <a onClick="restoreCourse()" class="btn btn-primary mt-4">Restore Course</a>
                <a onClick="deleteCourse()" class="btn btn-primary mt-4">Delete Course</a>
                `
        });

} else {

    window.location.replace('../../index.html');
};