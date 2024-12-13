const express = require('express');
const app = express();
const oracledb = require('oracledb');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(cors({
  origin: 'http://localhost:3000'  // Allow only this origin
}));

dotenv.config(); // Load environment variables from .env file





async function initOracleConnection() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });
    console.log("Oracle Database connected!");
  } catch (err) {
    console.error("Error connecting to Oracle Database:", err);
  }
}

initOracleConnection();

// Simple API route
app.get('/api/data', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT * FROM FRIENDIFY_POSTS');
    res.json(result.rows); // Send rows from query as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});


// SAVE DAT

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory for saving images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique file name
  },
});

const upload = multer({ storage: storage });

// Middleware to parse JSON data (if needed)
app.use(express.json());

// API to create a post
app.post('/api/create-post', async (req, res) => {
  const { user, text } = req.body;

  // Validate input
  if (!user || !text) {
    return res.status(400).send('User and text are required');
  }

  const sql = `
    INSERT INTO FRIENDIFY_POSTS (USER_NAME, POST_TEXT)
    VALUES (:user, :text)
  `;

  const binds = {
    user: user,
    text: text,
  };

  try {
    await connection.execute(sql, binds, { autoCommit: true });

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error });
  } finally {
    // Close the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
