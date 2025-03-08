Run node init
give semantic version 
add description 
entry point is where you execute your file its like main.py
initialise git or not

create index.js
if we use import keyword we need to add the lien "type": module in packages.json 
requere syntax is used to import commanjs

the project has been initialized

.env file or .env.sample shows all the critical infrastructure in a project 
all the sensitive data is present in this file like passwords and other stuff
we need to keep this very safe
we never push this file to github

now we will use express
npm install express

we can check the dependencies and other check what version of express was installed

the copied code from express website had const express = requere("express")
which we will replace with import express from "express";

```javascirpt
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

this code is added index.js
make sure to never use bust ports

the fist argument is when we call the get method and the second argrument is callback
the app is a webserver 
we get a route request
the '/' means that tis going to the origin
we can request and return anything using the callback 
`(req, res) => {res.send('Hello World!')`
errors that can happend:
1. instead of doing "/hitesh" we just write hitesh

now we do a node index.js
the result will be from line app.listen and the console.log in it 
the app.get part only works on request
we can send the request by writing localhose:3000 in the browser 

everytime we change the code we need to reload so we can use `nodemon`
`npm i -D nodemon` this will ceate a dependency that is not necessay 
and also add scripts: {
"start": "nodemon index.js"
} // start is just the name of the scipt we can use any name we write we will name it "dev" in the code
you can now run the project by running the following command

we cant really use port hardcoded as we dont know what port hte server will give 
we keep the the port in server 
we use dotenv form npm for to load the env variable to the process.env file 
then do `import dotenv from dotenv`
also add dotenv.config()
we get the port using process.env.PORT and we use this in app.listen by 
const port - porcess.env.PORT || 3000 // this is for production purposses as we can just use 3000 locally to check out porjects

Explain CORS: and why they are needed
CORS are used to resolve the mismatch of port between frontend and backend 
add `app.use(cors({<we write configs here>
origin: "http://localhost:3000 // we can use an array incase we need to mave multiple orgins ?? this to make sure that we are the only one sending the request and not some random person
methods: [get, 'post', 'delete', 'options']})"`
allowedHeaders: ['Content-Type', 'Authorixation']

app.use(express.json()) // this is for when we need to accept json
app.use(express.urlencoded({extenede:true})) for when we need to use url with %20% i.e. spaces 

all of this is boiler plater code is ususally never written from scratch // these are the basic needs of the server 

Backend is used for all the logic
and Database is used for storing all the data

express just makes life easy 

right now we will use MongoDB this is done using mongoose package 
we talk to mongoose and it talks to the database // mongose is basically a middleman
mongoose stays inside the backend 
`npm i mongoose`
if install is successful you can check it under dependencies in packages.json

create a utils folder called utils underwhich you have the file called db.js

do a setup on mongodb.com, the password and username is used to connect to the DB
now will will use driver method to use it 

we get a url that we can use to connect 
MONGO_URL=mongodb+srv:youtube:passoword234@cluster.aflalfjall

BASE_URL=https://localhost300 in evn file and use it for the cors and replace it with process.env.BASE_URL

now we will use edit out db.js
```javascript[]
import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config() // this is when it does not load automatically we usually dont need to import the dotenv.config file 

// export to connect to db
const db = () => {
mongoose.connect(process.env.MONGO_URL)
.then(() => {
console.log("connected to mongodb")
})
.catch((err) => {
console.log("Error connecting to mongodb")
	})
}

export defautl db
```

in index.js import db from './utils/db.js' // we usually dont need ot write .js bt sometimes it does not work so make sure to add it 

and add the line 
`db()` to connect the db
when ever you change the the environment variables we need to restart the server the new stuff to work



# Most of the learning happens on Management systems 
_MS 
LMS 
CMS
HMS
BMS

We need to know what data we need to host before making anything
Learn how to make software 

building an auth
![[Screenshot 2025-03-08 at 22.52.53.png]]
this is the schema of the user 



seperating controller and route

create a directory called user.controller.js
const registerUser = async (req, res) => {
res.send("registered")
};
export {registerUser}

now mkdir routs and create a filrs called user.routes.js
import express from 'express'
import { registerUser } from "../controller/user.controller.js"
const reouter = express.Router
<your actual code>
export default router

this is boiler plate code that will be written for almost every porject

router.get("/register", registerUser)

Now in index.js
import userRoutes from "./routs/use.routes.js"

below db() in index.js we add 
app.use("/api/vi/users", userRoutes)
