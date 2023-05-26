DROP TABLE USERS;
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email varchar(255),
    password varchar(255),
    fname varchar(255),
    lname varchar(255),
    role varchar(255) default 'student',
    status varchar(255) default 'off'
);

CREATE TABLE IF NOT EXISTS course(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    descreption varchar(255),
    capacity int,
    role varchar(255) default 'student',
    u_id int REFERENCES users (id) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS attendance(
    id SERIAL PRIMARY KEY,
    status varchar(50),
    role date,
);
    -- fk_sid int REFERENCES user (id) ON DELETE CASCADE (optinal)