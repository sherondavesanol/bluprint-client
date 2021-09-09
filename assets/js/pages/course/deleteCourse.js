// Delete course
const deleteCourse = () => {'click', 
    
    fetch('http://localhost:3000/api/courses/delete-course', 
        {
            method: "DELETE",
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