// Importing the Express framework
const express = require('express');
const bcrypt = require('bcrypt');
const oracledb = require('oracledb');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'  // Allow only requests from your React app
}));

const dbConfig = {
  user: 'n01670407',          // Oracle username
  password: 'oracle',      // Oracle password
  connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=calvin.humber.ca)(PORT=1521))(CONNECT_DATA=(SID=grok)))' // Update to match your connection string
};


// API to Register User
app.post('/register', async (req, res) => {
  let connection;
  try {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    // Connect to Oracle Database
    connection = await oracledb.getConnection(dbConfig);

    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert the user data
    const sql = `INSERT INTO FRIENDIFY_USERS (USERNAME, EMAIL, PASSWORD) VALUES (:username, :email, :password)`;

    const binds = {
      username,
      email,
      password: hashedPassword 
    };

    // Execute SQL Insert
    const result = await connection.execute(sql, binds, { autoCommit: true });

    res.status(200).send({ message: `User registered successfully.` });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send({ message: "Failed to register user." });
  } finally {
    // Close the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
      // Check if email and password are provided
      if (!email || !password) {
          return res.status(400).send('Email and password are required');
      }

      // Create Oracle DB connection
      connection = await oracledb.getConnection(dbConfig);

      // SQL query to fetch user based on email
      const query = 'SELECT USERNAME, PASSWORD FROM FRIENDIFY_USERS WHERE EMAIL = :email';
      const result = await connection.execute(query, [email]);

      if (result.rows.length === 0) {
          return res.status(401).send({ success: false, message: 'Invalid email or password' });
      }

      const user = result.rows[0];
      const storedPassword = user[1]; // The hashed password stored in the DB

      // Compare the stored hashed password with the entered password
     const match = await bcrypt.compare(password, storedPassword);
    //  const match = password === storedPassword;

      if (match) {
          // Password is correct, return user details
          res.status(200).send({
              success: true,
              user: {
                  username: user[0], // Send the username to the frontend
                  email: email,
              }
          });
      } else {
          // Password is incorrect
          res.status(401).send({ success: false, message: 'Invalid email or password' });
      }

  } catch (err) {
      console.error('Error during login:', err);
      res.status(500).send('Internal server error');
  } finally {
      if (connection) {
          try {
              await connection.close();
          } catch (err) {
              console.error('Error closing connection:', err);
          }
      }
  }
});


// Configure multer to store files in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to Insert Data and File into Oracle Database
app.post('/create-post', upload.single('file'), async (req, res) => {
  let connection;
  try {
    const { text, user } = req.body;
    console.log(text +  user);
    const file = req.file;

    // Validate inputs
    if (!text || !user || !file) {
      return res.status(400).send("Missing required values or file.");
    }

    // Convert the file to a binary format (for storing in Oracle BLOB column)
    const fileData = fs.readFileSync(file.path);

    // Connect to Oracle Database
    connection = await oracledb.getConnection(dbConfig);

    // SQL Insert query for data and file
    const sql = `INSERT INTO FRIENDIFY_POSTS (USER_NAME, POST_TEXT, POST_CONTENT) VALUES (:value1, :value2, :fileData)`;


    // Bind data values, including file data as BLOB
    const binds = {
      value1: user,
      value2: text,
      fileData: fileData
      // fileName: file.originalname
    };

    console.log("Success insert before:");
    // Execute SQL Insert
    const result = await connection.execute(sql, binds, { autoCommit: true });
    
    console.log("Success insert after:");

    res.status(200).send(`Rows inserted: ${result.rowsAffected}`);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Failed to insert data");
  } finally {
    // Delete file after reading
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    // Close the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});



// API endpoint to fetch posts from FRIENDIFY_POSTS table
app.get('/api/fetch-posts', async (req, res) => {
  let connection;

  try {
    // Establish a connection to the Oracle database
    connection = await oracledb.getConnection(dbConfig);

    // Define SQL query to fetch the required columns
    const query = `
      SELECT POST_TEXT, USER_NAME, POST_CONTENT, POST_DATE
      FROM FRIENDIFY_POSTS ORDER BY POST_DATE DESC
    `;

    // Execute the query
    const result = await connection.execute(query);

    // Process the result to convert BLOB data
    const posts = await Promise.all(
      result.rows.map(async (row) => {
        const postText = row[0];
        const userName = row[1];
        const postDataBlob = row[2];
        const postDate = row[3];

        // Convert BLOB data to a base64 string
        let postData = null;
        if (postDataBlob) {
          const buffer = await postDataBlob.getData();
          postData = buffer.toString('base64');
        }

        return {
          postText,
          userName,
          postData,
          postDate
        };
      })
    );

    // Send the processed posts data as JSON response
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts from Oracle database:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  } finally {
    if (connection) {
      try {
        // Close the Oracle database connection
        await connection.close();
      } catch (closeError) {
        console.error("Error closing Oracle connection:", closeError);
      }
    }
  }
});


// Start the server on port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
