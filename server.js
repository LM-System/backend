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


app.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    const sql=`select * from users where email=$1 AND password=$2;`;
    client.query(sql,[email,password]).then((data)=>{
        res.status(200).send(data.rows);
    }).catch((e)=>{
        console.log(e);
    });
});

app.post('/addstudent',(req,res)=>{
    const {email,password,fname,lname}=req.body;
    const status="off";
    const role="student";
    const sql=`INSERT INTO users(email,password,fname,lname,role,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
    client.query(sql,[email,password,fname,lname,role,status]).then((data)=>{
        console.log(data);
        res.status(200).send(data.rows);
    }).catch((e)=>{
        console.log(e);
    });
});

app.put('/updatestudent/:id',(req,res)=>{
    const {id}=req.params;
    const {email,password,fname,lname,status}=req.body;
    const role="student";
    const sql=`update users set
    email=$1,password=$2,fname=$3,lname=$4,role=$5,status=$6
    where id=${id} returning *;`;
    client.query(sql,[email,password,fname,lname,role,status]).then((data)=>{
        console.log(data);
        res.status(200).send(data.rows);
    }).catch((e)=>{
        console.log(e);
    });
});

client.connect().then(() => {
    app.listen(port, () => {
    console.log(`server is running is port ${port}`);
    });
});
