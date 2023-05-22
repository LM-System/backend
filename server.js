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

app.post("/addCourse", handeleAddCourse);

function handeleAddCourse(req, res) {
  const course = res.body;
  const sql = `INSERT into course (title,descreption,capacity,role,u_id) values ('${course.title}','${course.descreption}','${course.role}','${course.u_id}');`;
  client.query(sql).then(() => {
    res.send("Course added successfully");
  });
}

app.listen(4000, () => {
  console.log(`server is running is port ${4000}`);
});

app.listen(4000, () => {
  console.log(`server is running is port ${4000}`);
});
