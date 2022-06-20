// install and import express
const express = require("express");

// const express = () => {};
let app = express();

// Code here
const path = require("path");
app.use(express.json());
const PORT = process.env.PORT || 8000;
let usersData = require("./assets/user.json");
console.log('usersData:', usersData);
// const html = require("./assets")


app.get("/", async (req,res) => {
    try {
        res.sendFile(path.join(__dirname, "./assets/users.html"))
    }
    catch(error) {
        return res.status(500).json({
            error : error.message,
        })
    }
})

app.get("/users", async (req,res) => {
    try {
        res.status(200).json({
            users : usersData,
        })
    }
    catch(error) {

        res.status(500).json({
            error : error.message,
        })

    }
})

app.get("/users/:id", (req,res) => {
    try {
        const { id } = req.params;
        console.log('id:',typeof id)
        const user = usersData.filter((element) => {
          
            return element.id == id;
          
        })
        if(user.length === 0) {
            return res.status(500).json({

                "Error" : "User not found try again"
            })
        }        
        console.log('user:', user);

        res.status(200).json({
            user : user
        })
    }
    catch(error) {

        return res.status(500).json({
            error : error.message
        })

    }
})

app.post("/users", async (req,res) => {
    try {
        usersData = [...usersData,req.body];   
        console.log('usersData:', usersData);
        return res.status(201).json({
            users : usersData,
        })
    }
    catch(error) {
        return res.status(500).json({
            error : error.message,
        })
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

// Note: Do not remove this export statement
module.exports = app;
