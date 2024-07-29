const router = require('express').Router();
const client = require('../db/connection.js')
const Query = require('../lib/Query.js')

//GET ROUTES
//GET route to send all students 
//localhost:3333/api/students
router.get('/students', async (request, response) => {
    const students = await Query.getStudents();


        response.json(students)
});

router.get('/courses', async (request, response) => {
    const courses = await Query.getCourses();


        response.json(courses)
});

// CREATE ROUTES

//POST ROUTE TO CREATE A COURSE 
//post request to localhost:3333/api/students
router.post('/courses', async(request, response) => {
const formData = request.body;

await Query.addCourse(formData);

response.json({
    message: 'Course created successfully!'
})
})

//POST ROUTE TO CREATE A STUDENT 
//post request to localhost:3333/api/students
router.post('/students', async(request, response) => {
    const formData = request.body;
    
    await Query.addStudent(formData);
    
    response.json({
        message: 'Student created successfully!'
    })
    })

module.exports = router;