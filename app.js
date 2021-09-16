const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json()); // parse json bodies in the request object

// index server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// public files served   
app.use("/public", express.static('public'));

// Redirect requests to endpoint starting with /employees to employee-routes.js
app.use("/employees", require("./routes/employee-routes"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));