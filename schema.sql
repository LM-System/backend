CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email varchar(255),
    password varchar(255),
    fname varchar(255),
    lname varchar(255),
    role varchar(255),
    status varchar(255)
);
INSERT INTO users(email,password,fname,lname,role,status) VALUES ('MALEK@MALEK.COM','1234','MALEK','AHMAD','STUDENT','ON');
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