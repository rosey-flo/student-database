const client = require('../db/connection')


class Query {
    static async addCourse(answerObj) {
        //again this is where we make the request to get the info from the query.sql/seed.sql
        const sql = 'INSERT INTO courses (course_name, course_type) VALUES ($1, $2)';
        await client.query(sql, [answerObj.course_name, answerObj.course_type]); 
        //this aligns with the name of the prompt inquiries from showaddcourseprompt
        console.log('\nCourse created successfully\n');
    }
static async addStudent({first_name, last_name, course_id}) {
    const sql = `INSERT INTO students (first_name, last_name, course_id) VALUES ($1, $2, $3)`
    await client.query(sql, [first_name, last_name, course_id])

    console.log('Student created Successfully!\n')
}
}

module.exports = Query;