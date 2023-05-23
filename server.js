"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pg = require("pg");
const app = express();
const port = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Connected");
});

app.post("/signin",handleSignIn );
app.get("/getcourse", handleGetCourse);
app.post("/addcourse", handeleAddCourse); //Add Course end point
app.post("/addstudent",handleAddStudent) ;
app.put("/updatestudent/:id",handleUpdateStudent);
app.delete("/deletestudent/:id",handleDeleteStudent );
app.post("/addteacher", handleAddTeacher);
app.put("/updateteacher/:id", handleUpdateTeacher);
app.delete("/deleteteacher/:id",handleDeleteTeacher);
function handleGetCourse(req, res) {
  const sql = "select * from course;";
    client.query(sql).then((data) => {
    let dataFromDB = data.rows;
    res.send(dataFromDB);
    });
}

function handeleAddCourse(req, res) {
  // Add course function
    const course = res.body;
    const sql = `INSERT into course (title,descreption,capacity,role,u_id) values ('${course.title}','${course.descreption}','${course.role}','${course.u_id}');`;
    client.query(sql).then(() => {
    res.send("Course added successfully");
    });
}

function handleSignIn(req,res) {
    const { email, password } = req.body;
    const sql = `select * from users where email=$1 AND password=$2;`;
    client
    .query(sql, [email, password])
    .then((data) => {
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

function handleAddStudent(req,res) {
    const { email, password, fname, lname } = req.body;
    const status = "off";
    const role = "student";
    const sql = `INSERT INTO users(email,password,fname,lname,role,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    client
    .query(sql, [email, password, fname, lname, role, status])
    .then((data) => {
        console.log(data);
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

function handleUpdateStudent(req,res){
    const { id } = req.params;
    const { email, password, fname, lname, status } = req.body;
    const role = "student";
    const sql = `update users set
    email=$1,password=$2,fname=$3,lname=$4,role=$5,status=$6
    where id=${id} returning *;`;
    client
    .query(sql, [email, password, fname, lname, role, status])
    .then((data) => {
        console.log(data);
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

function handleDeleteStudent(req,res) {
    const { id } = req.params;
    const sql = `DELETE from users where id=${id} role="student";`;
    client
    .query(sql)
    .then((data) => {
        console.log(data);
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

function handleAddTeacher(req,res) {
    const { email, password, fname, lname } = req.body;
    const status = "off";
    const role = "teacher";
    const sql = `INSERT INTO users(email,password,fname,lname,role,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    client
    .query(sql, [email, password, fname, lname, role, status])
    .then((data) => {
        console.log(data);
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

function handleUpdateTeacher(req,res) {
    const { id } = req.params;
    const { email, password, fname, lname, status } = req.body;
    const role = "teacher";
    const sql = `update users set
    email=$1,password=$2,fname=$3,lname=$4,role=$5,status=$6
    where id=${id} returning *;`;
    client
    .query(sql, [email, password, fname, lname, role, status])
    .then((data) => {
        console.log(data);
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

function handleDeleteTeacher(req,res) {
    const { id } = req.params;
    const role = "teacher";
    const sql = `DELETE from users where id=$1 AND role=$2 ;`;
    client
    .query(sql,[id,role])
    .then((data) => {
        console.log(data);
        res.status(200).send(data.rows);
    })
    .catch((e) => {
        console.log(e);
    });
}

client.connect().then(() => {
    app.listen(port, () => {
    console.log(`server is running is port ${port}`);
    });
});
// "`[{title:`javascript Course`,startDate:`22-5-2023`,endDate:`22-5-2023`},{title:`DotNet Course`,startDate:`22-5-2023`,endDate:`22-5-2023`}]`"