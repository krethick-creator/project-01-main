const express = require("express");
//creat object for express
const app = express();
const path = require('path');
const cors = require("cors");
const bcrypt = require("bcrypt");
const collection = require('./config');
app.use(cors()); // allows all origins
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//get api  route



app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});






app.post('/register', async (req, res) => {
  console.log("Register payload:", req.body);
  try {
    const existingUser = await collection.findOne({ name: req.body.userEmail });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const data = {
      username: req.body.username,
      name: req.body.userEmail,
      password: hashedPassword
    };

    //mongo insert  
    await collection.insertMany([data]);
    res.send('user created successfully');
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  console.log("Login payload:", req.body);
  try {
    const user = await collection.findOne({ name: req.body.userEmail });

    if (!user) {
      return res.status(404).send('user does not exist');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send('invalid credentials');
    }

    res.json({
      message: 'login successful',
      username: user.username,
      userEmail: user.name
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send('Error during login');
  }
});


app.listen("3232", () => {
  console.log("server is started on port 3232");
});
