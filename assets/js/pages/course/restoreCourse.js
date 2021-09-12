// Course Id
const params = new URLSearchParams(window.location.search);
const courseId = (params.get('courseId'));

// API Endpoints
const RESTORE_COURSE = 'https://bluprint-api-sdss.herokuapp.com/api/courses/restore-course';

// Options
const restoreCourseOptions = {
    method: "PUT",
    headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({
        id: courseId
    })
}

// Restore course
const restoreCourse = () => {'click', 
    
    fetch(RESTORE_COURSE, restoreCourseOptions)
        .then(data => data.json())
        .then(data => data
                ? window.location.replace('../admin/admin-view-courses.html')
                : alert('error occured')
        );
};