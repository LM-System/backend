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

app.post("/signin", handleSignIn);
app.post("/signup", handleSignUp);

// get users end point
app.get("/getusers", handleGetUsers);

//Add Delete Update Course end point
app.get("/getcourse", handleGetCourse);

app.post("/addcourse", handeleAddCourse); 
app.delete("/deletecourse/:id", handleDeleteCourseID); 
app.put("/updatecourse/:id", handleCourseUpdate); 

// Get user course end point
app.get("/usercourse/:id", handleUserCourse); 

// Update user status end point
app.put("/updatestatues/:id", handleStatusUpdate); // Update users statues when log in end point

// Update user student end point
app.put("/updatestudent/:id", handleUpdateStudent);
app.delete("/deletestudent/:id", handleDeleteStudent);

// Update and Delete user status end point
app.put("/updateteacher/:id", handleUpdateTeacher);
app.delete("/deleteteacher/:id", handleDeleteTeacher);

function handleSignIn(req, res) {
  const { email, password } = req.body;
  const sql = `select * from users where email=$1 AND password=$2;`;
  client
    .query(sql, [email, password])
    .then((data) => {
      console.log(data);
      let myObj={
        message:'',
        rows:null
    }
      if (data.rowCount) {
        myObj.message="success";
        myObj.rows=data.rows;
        console.log(myObj)
        res.status(200).send(myObj);
      }
      else{
        myObj.message="failed";
        myObj.rows="login failed please try logging with correct data";
        res.send(myObj);
      }
    })
    .catch((e) => {

      console.log(e);
    });
}

function handleSignUp(req,res) {
  const { email, password, fname, lname,role } = req.body;
  const status = "off";
  const sql = `INSERT INTO users(email,password,fname,lname,role,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
  client.query(sql,[email,password,fname,lname,role,status]).then((data)=>{
    res.status(200).send(data.rows);
  })
  .catch((e) => {
        res.status(200).send(data.rows);

  });}

  function handleGetCourse(req, res) {
    const sql = "select * from course;";
    client
      .query(sql)
      .then((data) => {
        let dataFromDB = data.rows;
        res.send(dataFromDB);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleGetUsers(req, res) {
    const sql = "select * from users;";
    client
      .query(sql)
      .then((data) => {
        res.send( data.rows);
      })
      .catch((e) => {
        console.log(e);
      });
  }

function handleUserCourse(req,res) {
  const {id}=req.params;
  const sql = `select * from course where u_id=${id};`;
  client
    .query(sql)
    .then((data) => {;
      res.send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handeleAddCourse(req, res) {
  // Add course function
  const { title, descreption, capacity, role, u_id } = req.body;
  const sql = `INSERT INTO course (title,descreption,capacity,role,u_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  client
    .query(sql, [title, descreption, capacity, role, u_id])
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleDeleteCourseID(req, res) {
  const id = req.params.id;
  const sql = `delete from course where id=${id};`;
  client
    .query(sql)
    .then((data) => {
      if (data) {
        res.status(204).send(data.rows);
      } else {
        res.status(404).json({ error: "Not found" });
      }
    })
    .catch();
}

function handleCourseUpdate(req, res) {
  const id = req.params.id;
  const { title, descreption, capacity, role } = req.body;
  const sql = `update course set title=$1,descreption=$2,capacity=$3,role=$4 where id=${id} returning *; `;
  client
    .query(sql, [title, descreption, capacity, role])
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleStatusUpdate(req, res) {
  const id = req.params.id;
  const { status } = req.body;
  const sql = `update users set status=$1 where id=${id} returning *;`;
  client
    .query(sql, [status])
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleUpdateStudent(req, res) {
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

function handleDeleteStudent(req, res) {
  const { id } = req.params;
  const sql = `DELETE from users where id=${id} AND role="student";`;
  client
    .query(sql)
    .then((data) => {
      console.log(data);
      res.status(200).send(data.rows);
      console.log(data);
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleUpdateTeacher(req, res) {
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

function handleDeleteTeacher(req, res) {
  const { id } = req.params;
  const role = "teacher";
  const sql = `DELETE from users where id=$1 AND role=$2 ;`;
  client
    .query(sql, [id, role])
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
/*// "`[{title:`javascript Course`,startDate:`22-5-2023`,endDate:`22-5-2023`},{title:`DotNet Course`,startDate:`22-5-2023`,endDate:`22-5-2023`}]`;*/
