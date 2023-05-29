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

// Add user course end point
app.post("/admincourse/:id", handeleAdminCourse);
app.post("/adminsignup", handeleAdminSignUp);

// Get user course end point
app.get("/usercourse/:id", handleUserCourse);

// Update user status end point
app.put("/updatestatues/:id", handleStatusUpdate); // Update users statues when log in end point

// Update user student end point
app.put("/updateuser/:id", handleUpdateUser);

// Update user Information end point
app.put("/userinformtion/:id", handleUserInformation);

// Delete user student end point
app.delete("/deleteuser/:id", handleDeleteUser);

// Update and Delete user status end point

app.get("/getanouncment", handleGetAnouncment); // Get all anouncments
app.post("/addanouncment", handleAddAnouncment); // Add anouncment
app.delete("/deleteanouncment/:id", handleDeleteAnouncment); // Delete anouncment
app.put("/updateanouncment/:id", handleanouncmentUpdate); // Update anouncment

function handleSignIn(req, res) {
  const { email, password } = req.body;
  const sql = `select * from users where email=$1 AND password=$2;`;
  client
    .query(sql, [email, password])
    .then((data) => {
      console.log(data);
      let myObj = {
        message: "",
        rows: null,
      };
      if (data.rowCount) {
        myObj.message = "success";
        myObj.rows = data.rows;
        console.log(myObj);
        res.status(200).send(myObj);
      } else {
        myObj.message = "failed";
        myObj.rows = "login failed please try logging with correct data";
        res.send(myObj);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleSignUp(req, res) {
  const { email, password, fname, lname, role } = req.body;
  const status = "off";
  const sql = `INSERT INTO users(email,password,fname,lname,role,status,image_path) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
  client
    .query(sql, [email, password, fname, lname, role, status])
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((e) => {
      res.status(200).send(data.rows);
    });
}

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

function handleUserInformation(req, res) {
  const { id } = req.params;
  // id |     email     | password | fname | lname |  role   | status | image_path | gender | birth_date | bio
  const { email, fname, lname, password, image_path,gender,birth_date,bio } = req.body;
  const sql = `update users set
    email=$1,fname=$2,lname=$3,password=$4,image_path=$5,gender=$6,birth_date=$7,bio=$8
    where id=${id} returning *;`;
  client
    .query(sql, [email, fname, lname, password, image_path,gender,birth_date,bio])
    .then((data) => {
      res.send(data.rows);
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
      res.send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleUserCourse(req, res) {
  const { id } = req.params;
  const sql = `select * from course where u_id=${id};`;
  client
    .query(sql)
    .then((data) => {
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
        res.status(204).send(data.rows);
      }).catch(e=>{
              console.log(e) 
      });
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

function handleUpdateUser(req, res) {
  const { id } = req.params;
  const { email, fname, lname, status } = req.body;
  const role = "student";
  const sql = `update users set
    email=$1,fname=$2,lname=$3,role=$4,status=$5
    where id=${id} returning *;`;
  client
    .query(sql, [email, fname, lname, role, status])
    .then(() => {
      const mysql = "select * from users;";
      client.query(mysql).then((data) => {
        res.send(data.rows);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
function handleDeleteUser(req, res) {
  const { id } = req.params;
  const sql = `DELETE from users where id=${id} RETURNING *;`;
  client
    .query(sql)
    .then(() => {
      const mysql = "select * from users;";
      client.query(mysql).then((data) => {
        res.send(data.rows);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleGetAnouncment(req, res) {
  const sql = "select * from anouncment ORDER BY id DESC;";
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

function handleAddAnouncment(req, res) {
  // Add anouncment function
  const { anouncment_title, anouncment_body } = req.body;
  const sql = `INSERT INTO anouncment (anouncment_title,anouncment_body) VALUES ($1,$2) RETURNING *;`;
  client
    .query(sql, [anouncment_title, anouncment_body])
    .then(() => {
      res.send("Added");
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleDeleteAnouncment(req, res) {
  const { id } = req.params;
  const sql = `DELETE from anouncment where id=${id} RETURNING *;`;
  client
    .query(sql)
    .then(() => {
      const mysql = "select * from anouncment;";
      client.query(mysql).then((data) => {
        res.send(data.rows);
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function handleanouncmentUpdate(req, res) {
  const { id } = req.params;
  const { anouncment_title, anouncment_body } = req.body;
  const sql = `update anouncment set
  anouncment_title=$1,anouncment_body=$2
    where id=${id} returning *;`;
  client
    .query(sql, [anouncment_title, anouncment_body])
    .then((data) => {
      res.send(data.rows);
    })
    .catch((e) => {
      console.log(e);
    });
}

function handeleAdminSignUp(req, res) {
  // Admin Add course function
  const { title, descreption, capacity, start_date, end_date, role, email, password, fname, lname, gender,birth_date } = req.body;
  const sql = `INSERT INTO user_course(title,descreption,capacity,start_date,end_date,role,email,password,fname,lname,gender) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *;`;
  client
    .query(sql, [title,descreption,capacity,start_date,end_date,role,email,password,fname,lname,gender,birth_date])
    .then((data) => {
     const myId=data.rows[0].id
     const myTitle=data.rows[0].title
     const myDescreption=data.rows[0].descreption
     const myCapacity=data.rows[0].capacity
     const myStart_date=data.rows[0].start_date
     const myEnd_date=data.rows[0].end_date
     const myRole=data.rows[0].role
     const myEmail=data.rows[0].email
     const myBirth_date=data.rows[0].birth_date
     const myPassword=data.rows[0].password
     const myFname=data.rows[0].fname
     const myLname=data.rows[0].lname
     const myGender=data.rows[0].gender
     console.log(myEmail);
     const mysql = `INSERT INTO users(email,password,fname,lname,role,gender,birth_date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
     client
       .query(mysql, [myEmail, myPassword, myFname, myLname, myRole,myGender,myBirth_date ])
       .then((data) => {
        const ourID=data.rows[0].id;
        const oursql = `INSERT INTO course (title,descreption,capacity,start_date,end_date,role,u_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;
        client
          .query(oursql, [myTitle, myDescreption, myCapacity,myStart_date,myEnd_date, myRole, ourID])
          .then((data) => {
            const oursql = `delete from user_course where id=${myId} RETURNING *;`;
            client
              .query(oursql)
              .then((data) => {
                const Usql = "select * from users;";
                client
                  .query(Usql)
                  .then((data) => {
                    res.send(data.rows);
                  })
                })  
                      })
      })
       .catch((e) => {
        console.log(e);
      });
    })
}

function handeleAdminCourse(req,res) {
  const u_id =req.params.id
  const { title, descreption, role} = req.body;
  const capacity=40
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
client.connect().then(() => {
  app.listen(port, () => {
    console.log(`server is running is port ${port}`);
  });
});

