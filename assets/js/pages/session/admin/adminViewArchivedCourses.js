if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // Cards
    const archivedCoursesBody = query('#archived-courses-body');

    // Get courses count
    fetch('http://localhost:3000/api/admin/admin-view-archived-courses',
        {
            method: "GET",
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {

            archivedCoursesBody.innerHTML = data.map((course) => {

                return   `
                        <tr class="">
                        <td>${course.name}</td>
                        <td><a href="./admin-view-archived-course.html?courseId=${course._id}">View Course</a></td>
                        </tr>
                        `

            }).join('');
        });

} else {

    window.location.replace('../../index.html');
};