const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
// const postRoutes = require("./routes/postRoutes");
const { Client } = require("pg");
const AWS = require('aws-sdk');
const { S3, PutObjectCommand } = require('@aws-sdk/client-s3'); // For AWS SDK v3

const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3({
    region: 'us-west-1',
    credentials: {
        accessKeyId: 'AKIAXGWC4PHJ2ILKVXMZ',
        secretAccessKey: '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',
    },
});

let imageUpload;

try {
    // change the name of the postId later?
    imageUpload = multer({
        storage: multerS3({
          s3: s3,  // Initialize S3 outside of the request
          bucket: 'boxhub-images',
          acl: 'bucket-owner-full-control',
          key: (req, file, cb) => {
            const postId = req.body.postId || 'test';  // Ensure postId exists
            cb(null, `${postId}`);  // Generate unique filename
          },
        }),
        limits: { fileSize: 1024 * 1024 * 5 },  // 5MB limit for testing
      });
}
catch(error) {
    console.log("ERROR : ", error);
}

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


app.use((req, res, next) => {
    req.client = client;
    req.s3 = s3;
    next();
});

app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.post("/api/posts/dummyPost", async(req, res) => {
    
});

// postRoutes stuff 
app.get("/api/posts/", async (req, res) => {
    try {
        const result = await req.client.query("SELECT * FROM posts");
        res.status(200).json(result);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.post("/api/posts/createPost", imageUpload.single("image"), async (req, res) => {
    // 1) insert title into postgresql database, get the postId number

    const title = req.body.title;
    const content = req.body.content;
    const image = req.file;

    const insertResult = await client.query("INSERT INTO posts(title) VALUES ($1) RETURNING id", [title]);
    const postId = insertResult.rows[0].id;

    // 2) Insert the image URL (from S3) into PostgreSQL
    const imageUrl = image.location;  // S3 URL of the uploaded image
    await client.query(
        "UPDATE posts SET image_url = $1 WHERE id = $2",
        [imageUrl, postId]
    );

    // 2) insert article into S3 with the postId number, get the url
    const articleBucketName = "boxhub-articles";

    const articleData = {
        content: content,
        postId: postId,
    }

    const articleParams = {
        Bucket: articleBucketName,
        Key: `${postId}.json`,
        ACL: 'bucket-owner-full-control', // Grants full control to the bucket owner
        Body: JSON.stringify(articleData),
        ContentType: "application/json"
    };

    // const articleS3Response = await s3.upload(articleParams).promise();
    const articleS3Response = await s3.send(new PutObjectCommand(articleParams));

    // 3) insert article url into postgresql database
    await client.query("UPDATE posts SET article_url = $1 WHERE id = $2", [articleS3Response.Location, postId]);

});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});