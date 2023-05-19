"use strict"
require("dotenv").config();
const express=require("express");
const cors=require("cors");
const pg=require("pg");
const app= express();
const client =new pg.Client(/*postgressSql URL*/);
app.use(cors());
app.use(express.json());


app.listen(4000,()=>{
    console.log(`server is running is port ${4000}`)
})