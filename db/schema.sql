\c postgres;
DROP DATABASE IF EXISTS students_app_db;

CREATE DATABASE students_app_db;

\c students_app_db


CREATE TABLE courses (
	id SERIAL PRIMARY KEY, --REFERENCED
	course_name VARCHAR (250),
	course_type VARCHAR (250)
);

-- optional for students
CREATE TABLE groups (
	id SERIAL PRIMARY KEY, --REFERENCED
	group_name VARCHAR (200)
);

CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR (200),
	last_name VARCHAR (200),
	course_id INTEGER NOT NULL,
	group_id INT,
	group_leader_id INT,
	FOREIGN KEY (course_id) REFERENCES courses(id)
		ON DELETE CASCADE, 
	--MAKES AN ASSOCIATION WITH A COLUMN FROM THE COURSES TABLE
	FOREIGN KEY (group_id) REFERENCES groups(id),
	FOREIGN KEY (group_leader_id) REFERENCES students(id)

);

--THE NOT NULL MAKES IT A REQUIREMENT OR IT WILL NOT PASS