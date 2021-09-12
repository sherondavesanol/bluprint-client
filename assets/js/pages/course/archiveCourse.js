// Course Id
const params = new URLSearchParams(window.location.search);
const courseId = (params.get('courseId'));

// Archive course
const archiveCourse = () => {'click', 
    
    fetch('https://bluprint-api-sdss.herokuapp.com/api/courses/archive-course', 
        {
            method: "PUT",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: courseId
            })
        })
        .then(data => data.json())
        .then(data => data
                ? window.location.replace('../admin/admin-view-courses.html')
                : alert('error occured')
        );
};