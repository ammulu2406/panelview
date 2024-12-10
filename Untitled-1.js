// // Import express.js
// const express = require("express");

// // Create express app
// const app = express();

// // Add static files location (if needed)
// app.use(express.static("static"));

// // Import database connection
// const db = require('./database');

// // Middleware for parsing JSON
// app.use(express.json());

// // Enable CORS
// const cors = require("cors");
// app.use(cors());

// // Define a route for root
// app.get("/", function(req, res) {
//     res.send("Welcome to the Quiz Game API!");
// });

// // Define a route to fetch questions
// app.get('/questions', async (req, res) => {
//     try {
//         const [results] = await db.query('SELECT * FROM quiz_game_questions');
//         res.json(results); // Send the fetched questions as JSON
//     } catch (err) {
//         console.error('Error fetching questions:', err);
//         res.status(500).json({ error: 'Database query failed' });
//     }
// });

// // Define a route to fetch options for a specific question
// app.get('/options/:q_id', async (req, res) => {
//     const q_id = req.params.q_id;
//     try {
//         const [results] = await db.query('SELECT * FROM quiz_options WHERE q_id = ?', [q_id]);
//         res.json(results); // Send the fetched options as JSON
//     } catch (err) {
//         console.error('Error fetching options:', err);
//         res.status(500).json({ error: 'Database query failed' });
//     }
// });

// // Example dynamic route
// app.get("/hello/:name", function(req, res) {
//     console.log(req.params);
//     res.send("Hello " + req.params.name);
// });

// // Start server on port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://127.0.0.1:${PORT}/`);
// });

////////////////////////
const quizData = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"]
    },
    {
      question: "What is the default port number for HTTP?",
      options: ["80", "8080", "443"]
    },
    {
      question: "Which programming language is primarily used for iOS app development?",
      options: ["Swift", "Java", "Kotlin"]
    }
  ];
  
  // Display questions and options
  const quizContainer = document.getElementById("quiz");
  quizData.forEach((item, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
    item.options.forEach(option => {
      questionElement.innerHTML += `<p><input type="radio" name="question${index}"> ${option}</p>`;
    });
    quizContainer.appendChild(questionElement);
  });