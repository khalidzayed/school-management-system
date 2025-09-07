CREATE DATABASE school_management;

\c school_management;

-- Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    role TEXT CHECK (role IN ('admin', 'teacher', 'student', 'parent')) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255)
);

-- Parents
CREATE TABLE Parents (
    id INT PRIMARY KEY,
    occupation VARCHAR(100),
    relation VARCHAR(50),
    CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Teachers
CREATE TABLE Teachers (
    id INT PRIMARY KEY,
    department VARCHAR(100),
    hire_date DATE,
    salary DECIMAL(10,2),
    CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Classes
CREATE TABLE Classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    teacher_id INT,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES Teachers(id) ON DELETE SET NULL
);

-- Students
CREATE TABLE Students (
    id INT PRIMARY KEY,
    parent_id INT,
    class_id INT,
    roll_number VARCHAR(50),
    CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE SET NULL,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE SET NULL
);

-- Subjects
CREATE TABLE Subjects (
    id SERIAL PRIMARY KEY,
    class_id INT,
    teacher_id INT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES Teachers(id) ON DELETE SET NULL
);

-- Exams
CREATE TABLE Exams (
    id SERIAL PRIMARY KEY,
    class_id INT,
    name VARCHAR(100),
    date DATE,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE CASCADE
);

-- Grades
CREATE TABLE Grades (
    id SERIAL PRIMARY KEY,
    exam_id INT,
    student_id INT,
    subject_id INT,
    marks_obtained DECIMAL(5,2),
    marks_total DECIMAL(5,2),
    grade VARCHAR(5),
    CONSTRAINT fk_exam FOREIGN KEY (exam_id) REFERENCES Exams(id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    CONSTRAINT fk_subject FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE
);

-- Attendance
CREATE TABLE Attendance (
    id SERIAL PRIMARY KEY,
    student_id INT,
    class_id INT,
    date DATE,
    status TEXT CHECK (status IN ('present', 'absent', 'late')),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE CASCADE
);

-- Timetable
CREATE TABLE Timetable (
    id SERIAL PRIMARY KEY,
    class_id INT,
    subject_id INT,
    day_of_week TEXT CHECK (day_of_week IN ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')),
    start_time TIME,
    end_time TIME,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_subject FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE
);

-- Announcements
CREATE TABLE Announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    content TEXT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE SET NULL
);

-- Messages
CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    subject VARCHAR(200),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_sender FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_receiver FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Study Materials
CREATE TABLE StudyMaterials (
    id SERIAL PRIMARY KEY,
    class_id INT,
    subject_id INT,
    title VARCHAR(200),
    file_path VARCHAR(255),
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_class FOREIGN KEY (class_id) REFERENCES Classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_subject FOREIGN KEY (subject_id) REFERENCES Subjects(id) ON DELETE CASCADE,
    CONSTRAINT fk_teacher FOREIGN KEY (uploaded_by) REFERENCES Teachers(id) ON DELETE CASCADE
);

-- Downloads
CREATE TABLE Downloads (
    id SERIAL PRIMARY KEY,
    material_id INT,
    student_id INT,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_material FOREIGN KEY (material_id) REFERENCES StudyMaterials(id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students(id) ON DELETE CASCADE
);