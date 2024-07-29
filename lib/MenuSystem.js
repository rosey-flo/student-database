//CAPILAITZED FILE BECAUSE IT IS A CLASS
//CAN CREATE A TOOLSET
//
//const inquirer = require('inquirer')
const client = require('../db/connection.js')
const Query = require('./Query.js')
require('console.table') //THIS SETS UP THE LAYOUT OF THE DATABASE INFO

class MenuSystem {
    //THE ASYNC HERE CREATES THE PROMISE CAUGHT IN INDEX.JS ln 25
    static async showAllStudents() {

        //THIS WILL BRING IN MY QUERY.SQL INSTRUCTIONS TO CALL DATA
        //THE DOLLAR SIGN IS A PLACEHOLDER FOR THE SECOND ARGUMENT INPUT INTO THE CONST DATA QUERY WHICH IS CALLING THE SQL FIRST AND PLACING IN THE SECOND AS THE PLACEHOLDER
        // --- const sql = `SELECT * FROM $1` 
        // --- const data = await data.query(sql, [`students`])
        const sql = `
    SELECT 
    s.id AS student_id,
    CONCAT(s.first_name, ' ', s.last_name) AS full_name,
    c.id AS course_id,
    course_name,
    course_type,
    g.id AS group_id,
    group_name,
    gleaders. first_name AS group_leader
    FROM students AS s
        JOIN courses AS c
            ON s.course_id = c.id
        LEFT JOIN groups AS g
            ON s.group_id = g.id
        LEFT JOIN students AS gleaders
            ON s.group_leader_id = gleaders.id
    ORDER BY student_id;
    `
        const data = await client.query(sql)


        console.table(data.rows) //CALLS THE CONSOLE.TABLE LAYOUT
    }


    static async showAddCoursePrompt() {
        console.log('\nPlease enter the course information\n')

        const answerObj = await inquirer.prompt([
            {
                name: 'course_name',
                message: 'Enter the course name'
            },
            {
                name: 'course_type',
                message: 'Enter the course type'
            }
        ])
        await Query.addCourse(answerObj)
        //THIS ADDS THE SHOW ADD COURSE INFORMATION TO THE ADD COURSE INDER THE QUERY CLASS AS THE ANSWEROBJ
    }

    static async showAddStudentPrompt() {
        //Ths aread grabs the courses from the database, so we can show a lost of courses for the user to choose from whrn creating the students
        const { rows: courses } = await client.query(`SELECT * FROM courses`);
        //EQUIVALEN TO TO COURSES.ROWS - DESCTRUCTURED
        const answerObj = await inquirer.prompt([
            {
                name: 'first_name',
                message: 'Enter the student first name.'
            },
            {
                name: 'last_name',
                message: 'Please enter student last name.'
            },
            {
                name: 'course_id',
                message: 'Select the course the student is enrolled in.',
                type: 'list',
                choices: courses.map(courseObj => {
                    return {
                        name: courseObj.course_name, //What the user sees
                        value: courseObj.id
                        //ATTATCH THE ASSOCIATION TO THE COURSE BY THEIR ID 
                    }
                })
            }
        ]);
        await Query.addStudent(answerObj);
    }
}


module.exports = MenuSystem;
//CHECKPOINT 5 = CREATE A STATIC SYSTEM SO WE CAN CALL THE CLASS CONSTRUCTOR




















// class MenuSystem {
//     showAllStudents () {

//     }
// }


// //to call it, i would have ti instantiate and create a new MenuSystem
// const ms = new MenuSystem();

// ms.showAllStudents()
// //this is an instance method calling an instance object vs a static methods