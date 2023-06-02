const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  to store registered users
const users = [];

// Registration endpoint
app.route('/register')
  .get((req, res) => {
    res.send(`
      <h1>Registration</h1>
      <form action="/register" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form>
    `);
  })
  .post((req, res) => {
    const { username, password } = req.body;

    // Check  already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    // Create new user object
    const newUser = {
      username,
      password
    };

    // Add new user 
    users.push(newUser);

    return res.status(201).send('User registered successfully');
  });

// Login endpoint 
app.route('/login')
  .get((req, res) => {
    res.send(`
      <h1>Login</h1>
      <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    `);
  })
  .post((req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);

    // Check  user exists and  password matches
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    return res.status(200).send('Login successful');
  });


app.get('/', (req, res) => {
  res.send('Welcome to the login and registration page!');
});


app.listen(4000, () => {
  console.log('Server started on port 4000');
});
