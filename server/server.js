// import express from our node modules
const express = require("express")

// import cors from our node modules

const cors = require("cors")

// run the config method of dotenv so we can have access to our enviroment variables

require("dotenv").config()

// tell the server what port to run on
// const PORT = process.env || 8081 // change it if you already have something running on it like 8081
const PORT = process.env.PORT || 8081 

// instanciating our instance of express into the app veriable
const app = express()

// Cross-Origin Resource Sharing cors is the bridge that allows the client to access the server
// it is called a middle ware
// activate middleware
app.use(cors())

//import the json data
const data = require("./data.json")

function filterGamesByYear(theYear){
    const result = data.filter((game)=> game.year == theYear)
    return result
}

function filterGamesByTitle(title){
    const theGame = data.find((game)=> game.title == title)
    return theGame
}

//create endpoint
app.get("/", (request, response)=>{
    response.json("Hey Good Looking")
})

// app.get("/games", (request, response)=> {
// response.json(data)
// })

app.get("/games", (request, response)=>{
    // console.log(request.query)
    // response.json("hello")
    let dataToReturn = data

    if (request.query.title){
        dataToReturn = filterGamesByTitle(request.query.title)
    }
    else if(request.query.year){
        dataToReturn = filterGamesByYear(request.query.year)
    }
    //http://localhost:8081/games?year=1995 will now show filtered games by the year 1995
    //http://localhost:8081/games?year=1995&title=GoldenEye will show only game that matches both year and title
    //http://localhost:8081/games?title=Super%20Skid%20Marks use %20 for whitespace

    response.json(dataToReturn)
});


app.listen(PORT, ()=> console.log(`app is running on port ${PORT}`))
