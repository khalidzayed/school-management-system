-- database/seed.sql
INSERT INTO Users (role, name, email, password, phone, address)
VALUES 
    ('admin', 'Admin User', 'admin@school.com', '$2b$10$examplehashedpassword123', '123456789', '123 School St'),
    ('teacher', 'Teacher One', 'teacher@school.com', '$2b$10$examplehashedpassword123', '987654321', '456 School St'),
    ('student', 'Student One', 'student@school.com', '$2b$10$examplehashedpassword123', '555555555', '789 School St'),
    ('parent', 'Parent One', 'parent@school.com', '$2b$10$examplehashedpassword123', '444444444', '101 School St');

INSERT INTO Teachers (id, department, hire_date, salary)
VALUES (2, 'Mathematics', '2023-01-01', 5000.00);

INSERT INTO Parents (id, occupation, relation)
VALUES (4, 'Engineer', 'Father');

INSERT INTO Classes (name, teacher_id)
VALUES ('Grade 10A', 2);

INSERT INTO Students (id, parent_id, class_id, roll_number)
VALUES (3, 4, 1, 'ST001');

INSERT INTO Subjects (class_id, teacher_id, name, code)
VALUES (1, 2, 'Mathematics', 'MATH101');

INSERT INTO Exams (class_id, name, date)
VALUES (1, 'Midterm Exam', '2025-10-15');

INSERT INTO Grades (exam_id, student_id, subject_id, marks_obtained, marks_total, grade)
VALUES (1, 3, 1, 85.50, 100.00, 'A');

INSERT INTO Attendance (student_id, class_id, date, status)
VALUES (3, 1, '2025-10-01', 'present');

INSERT INTO Timetable (class_id, subject_id, day_of_week, start_time, end_time)
VALUES (1, 1, 'Monday', '09:00:00', '10:00:00');

INSERT INTO Announcements (title, content, created_by)
VALUES ('Welcome Back', 'Welcome to the new school year!', 1);

INSERT INTO Messages (sender_id, receiver_id, subject, body)
VALUES (2, 3, 'Homework Reminder', 'Please submit your math homework by Friday.');

INSERT INTO StudyMaterials (class_id, subject_id, title, file_path, uploaded_by)
VALUES (1, 1, 'Algebra Notes', '/uploads/algebra_notes.pdf', 2);

INSERT INTO Downloads (material_id, student_id)
VALUES (1, 3);