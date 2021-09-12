if (localStorage.getItem('isAdmin') === 'true') {

    // Token
    const token = localStorage.getItem('token');

    // Cards
    const coursesBody = query('#courses-body');

    // Get courses count
    fetch('https://bluprint-api-sdss.herokuapp.com/api/admin/admin-view-courses',
        {
            method: "GET",
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {

            coursesBody.innerHTML = data.map((course) => {

                return   `
                        <tr class="">
                        <td>${course.name}</td>
                        <td><a href="./admin-view-course.html?courseId=${course._id}">View Course</a></td>
                        </tr>
                        `

            }).join('');
        });

} else {

    window.location.replace('../../index.html');
};