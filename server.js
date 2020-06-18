// Setup empty JS object to act as endpoint for all routes
projectData = {};
// projectData = {
//   temperature: "temp",
//   date: "date",
//   userResponse: "user-response",
// };

// Require Express to run server and routes

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app

const app = express();
app.use(cors());

// Setup Server
app.listen(8000, () =>
  console.log("serevr running : open http://localhost:8000 😃")
);

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));

//GET
app.get("/all", function (req, res) {
  res.send(projectData);
});

//post
//app.post("/add", reqData);

// function reqData(req, res) {
//   console.log(req.body);
//   newEntry = {
//     date: req.body.date,
//     temp: req.body.temp,
//     content: req.body.content,
//   };
//   projectData.push(newEntry);
//   //res.send(projectData);
//   //console.log(projectData);
// }

const data = [];
app.post("/add", newEntry);
function newEntry(req, res) {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["content"] = req.body.content;
  res.send(projectData);
}
