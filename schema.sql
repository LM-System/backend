DROP TABLE USERS
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email varchar(255),
    password varchar(255),
    fname varchar(255),
    lname varchar(255),
    role varchar(255),
    status varchar(255)
);
INSERT INTO users(email,password,fname,lname,role,status) VALUES ('mhd@mhd.com','1234','mhd','mhd','admin','on');
INSERT INTO users(email,password,fname,lname,role,status) VALUES ('ahd@mhdcom','1234','ahmad','shihab','teacher','on');
INSERT INTO users(email,password,fname,lname,role,status) VALUES ('musa@musa.com','1234','musa','bilal','student','on');
CREATE TABLE IF NOT EXISTS course(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    descreption varchar(255),
    capacity int,
    role varchar(255),
    u_id int REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attendance(
    id SERIAL PRIMARY KEY,
    status varchar(50),
    role date,
);
    -- fk_sid int REFERENCES user (id) ON DELETE CASCADE (optinal)