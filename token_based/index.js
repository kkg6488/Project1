const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'secretkey';

// User data array
let users = [];

// Register route
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  else{
    // Add user 
  users.push({ username, password });
  return res.status(200).json({ message: 'Registration successful' });
  }
  
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  const user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generation of JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.status(200).json({ message:'Login Sucessful',token });
});



// Creating HTML form 
app.get('/', (req, res) => {
  res.send(`
    <h1>Registration</h1>
    <form method="POST" action="/register">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Register</button>
    </form>
    
    <h1>Login</h1>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
    </form>
  `);
});

//  server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
