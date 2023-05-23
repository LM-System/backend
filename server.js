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

app.post("/addcourse", handeleAddCourse); //Add Course end point
app.get("/getcourse", handleGetCourse);

function handleGetCourse(req, res) {
  const sql = "select * from course;";
  client.query(sql).then((data) => {
    let dataFromDB = data.rows;
    res.send(dataFromDB);
  });
}

app.get("/signin", (req, res) => {
  const { email, password } = req.body;
  const sql = `select * from users where email=$1 AND password=$2`;
  client.query(sql, [email, password]).then((data) => {
    res.status(200).send(data.rows);
  });
});

function handeleAddCourse(req, res) {
  // Add course function
  const course = res.body;
  const sql = `INSERT into course (title,descreption,capacity,role,u_id) values ('${course.title}','${course.descreption}','${course.role}','${course.u_id}');`;
  client.query(sql).then(() => {
    res.send("Course added successfully");
  });
}

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`server is running is port ${port}`);
  });
});
