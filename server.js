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


app.get('/signin',(req,res)=>{
    const {email,password}=req.body;
    const sql=`select * from users where email=$1 AND password=$2`;
    client.query(sql,[email,password]).then((data)=>{
        res.status(200).send(data.rows);
    });
});
client.connect().then(() => {
    app.listen(port, () => {
    console.log(`server is running is port ${port}`);
    });
});
