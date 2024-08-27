const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const {Client} = require("pg");

const app = express();

app.use(express.json());

// CORS configuration to whitelist your client
const corsOptions = {
    origin: 'http://localhost:3000', // Only allow requests from this origin
    methods: ['GET,POST,PUT,DELETE'],  // Specify allowed HTTP methods
    credentials: true                // Allow credentials (e.g., cookies, authorization headers)
};

// Initialize the PostgreSQL client
const client = new Client({
    user: 'franklinnnwang',
    host: 'localhost',
    database: 'boxhub_db',
    password: 'strongpassword123',
    port: 5432, // Default port for PostgreSQL
});

// Connect to the database
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

app.use(cors(corsOptions));  // Apply CORS options

console.log("using postgres server");


// app.use("/api/users", userRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/posts", postRoutes);

app.use("/api/users", (req, res, next) => {
    req.client = client; // Attach the client to the request object
    next(); // Call the next middleware
}, userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

