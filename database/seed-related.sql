-- Users
INSERT INTO users (role, name, email, password, phone, address)
VALUES 
    ('admin', 'Admin User', 'admin@school.com', '$2b$10$examplehashedpassword123', '123456789', '123 School St'),
    ('teacher', 'Teacher One', 'teacher@school.com', '$2b$10$examplehashedpassword123', '987654321', '456 School St'),
    ('student', 'Student One', 'student@school.com', '$2b$10$examplehashedpassword123', '555555555', '789 School St'),
    ('parent', 'Parent One', 'parent@school.com', '$2b$10$examplehashedpassword123', '444444444', '101 School St'),
    ('student', 'Student Two', 'student2@school.com', '$2b$10$examplehashedpassword123', '222333444', '202 School St'),
    ('student', 'Student Three', 'student3@school.com', '$2b$10$examplehashedpassword123', '111222333', '303 School St'),
    ('student', 'Student Four', 'study_materials@school.com', '$2b$10$examplehashedpassword123', '999888777', '404 School St'),
    ('teacher', 'Teacher Two', 'teacher2@school.com', '$2b$10$examplehashedpassword123', '666777888', '505 School St');

-- Teachers
INSERT INTO teachers (id, department, hire_date, salary)
VALUES 
    (2, 'Mathematics', '2023-01-15', 50000.00),
    (8, 'Science', '2023-02-01', 55000.00);

-- Parents
INSERT INTO parents (id, occupation, relation)
VALUES 
    (4, 'Engineer', 'Father');

-- Classes
INSERT INTO classes (name, teacher_id)
VALUES 
    ('Grade 10A', 2),
    ('Grade 11B', 8),
    ('Grade 12C', NULL);

-- Students
INSERT INTO students (id, parent_id, class_id, roll_number)
VALUES 
    (3, 4, 1, 'STU001'),
    (5, NULL, 2, 'STU002'),
    (6, 4, 2, 'STU003'),
    (7, NULL, 3, 'STU004');

-- Subjects
INSERT INTO subjects (class_id, teacher_id, name, code)
VALUES 
    (1, 2, 'Mathematics', 'MATH101'),
    (2, 8, 'Science', 'SCI101'),
    (3, NULL, 'History', 'HIST101');

-- Exams
INSERT INTO exams (class_id, name, date)
VALUES 
    (1, 'Midterm Exam', '2023-06-15'),
    (2, 'Final Exam', '2023-12-10');

-- Grades
INSERT INTO grades (exam_id, student_id, subject_id, marks_obtained, marks_total, grade)
VALUES 
    (1, 3, 1, 85.00, 100.00, 'A'),
    (2, 5, 2, 78.50, 100.00, 'B');

-- Attendance
INSERT INTO attendance (student_id, class_id, date, status)
VALUES 
    (3, 1, '2023-06-01', 'present'),
    (5, 2, '2023-06-01', 'absent');

-- Timetable
INSERT INTO timetable (class_id, subject_id, day_of_week, start_time, end_time)
VALUES 
    (1, 1, 'Monday', '09:00:00', '10:00:00'),
    (2, 2, 'Tuesday', '10:00:00', '11:00:00');

-- Announcements
INSERT INTO announcements (title, content, created_by)
VALUES 
    ('School Holiday', 'School will be closed on 2023-07-01.', 1),
    ('Parent Meeting', 'Parent meeting on 2023-06-20.', 1);

-- Messages
INSERT INTO messages (sender_id, receiver_id, subject, body)
VALUES 
    (2, 4, 'Parent-Teacher Meeting', 'Please attend the meeting on 2023-06-20.'),
    (4, 2, 'Reply: Meeting', 'Confirmed, I will attend.');

-- Study Materials
INSERT INTO StudyMaterials (class_id, subject_id, title, file_path, uploaded_by)
VALUES 
    (1, 1, 'Math Notes', '/uploads/math_notes.pdf', 2),
    (2, 2, 'Science Slides', '/uploads/science_slides.pptx', 8);

-- Downloads
INSERT INTO downloads (material_id, student_id)
VALUES 
    (1, 3),
    (2, 5);