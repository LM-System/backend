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

CREATE TABLE IF NOT EXISTS course(
    id SERIAL PRIMARY KEY,
    title varchar(255),
    descreption varchar(255),
    capacity int,
    role varchar(255),
    u_id int REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO course(title,descreption,capacity,role) VALUES ('JS','How to create backend',50,'Student');


CREATE TABLE IF NOT EXISTS attendance(
    id SERIAL PRIMARY KEY,
    status varchar(50),
    role date,
);
    -- fk_sid int REFERENCES user (id) ON DELETE CASCADE (optinal)