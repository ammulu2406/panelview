// Import express.js
const express = require("express");

// Create express app
const app = express();

// Add static files location (if needed)
app.use(express.static("static"));

// Import database connection
const db = require('./db');

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS
const cors = require("cors");
app.use(cors());

// Define PORT (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the database successfully!");
        connection.release(); // Release the connection back to the pool
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Signup API
app.post("/api/signup", async (req, res) => {
    const { fname, lname, ph_num, gmail  } = req.body;

    // Validate input
    if (!fname || !lname || !ph_num || !gmail ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Insert data into `signup_table`
        const query = `
            INSERT INTO signup_table (fname, lname, ph_num, gmail) 
            VALUES (?, ?,?,?)
        `;
        const values = [fname, lname, ph_num, gmail];

        // Execute the query
        await db.query(query, values);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Database error:", error.message);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

//login page
// API to handle login
app.post('/api/login', (req, res) => {
    const { username, email } = req.body;
  
    if (!username || !email) {
      return res.status(400).json({ message: 'Please provide both username and email.' });
    }
  
    // SQL query with prepared statements to prevent SQL injection
    const query = 'SELECT * FROM login_table WHERE username = ? AND email = ? LIMIT 1';
  
    db.execute(query, [username, email], (err, results) => {
      if (err) {
        console.error('Error during query execution:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Check if a user was found
      if (results.length > 0) {
        // User found, successful login
        res.status(200).json({
          message: 'Login successful!',
          user: results[0], // User data
        });
      } else {
        // User not found
        res.status(401).json({ message: 'Invalid username or email.' });
      }
    });
  });

// API endpoint to get questions by difficulty

// API endpoint to fetch easy questions
// Example query to fetch questions
// Define your route before the server starts listening
app.get('/api/questions/easy', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM easy_quiz_questions');
        res.json(rows);  // Send the result as a JSON response
        // console.log(rows)
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Database query failed', details: err.message });
    }
});

app.get('/api/questions/medium', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM  medium_quiz_questions');
        res.json(rows);  // Send the result as a JSON response
        // console.log(rows)
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Database query failed', details: err.message });
    }
});

app.get('/api/questions/hard', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM hard_quiz_questions');
        res.json(rows);  // Send the result as a JSON response
        // console.log(rows)
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Database query failed', details: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
