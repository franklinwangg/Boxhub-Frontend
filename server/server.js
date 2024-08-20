const express = require("express");
const cors = require("cors");
const scheduler = require("./webscraper/scheduler");

const { MongoClient, ObjectId } = require('mongodb');

const bodyParser = require("body-parser");
const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://franklinnnwang:strongpassword123@cluster0.4bwh8vj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function startServer() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("boxing-forum");

        scheduler.runScheduler();

        // Routes

        app.post("/register", async (req, res) => {

            const { username, password } = req.body;
            try {
                console.log("Adding new user :", { username, password });

                const result = await db.collection("registered-users").insertOne({ username, password });

                console.log("User added successfully");
                console.log("end");
            } catch (error) {
                console.log("Error adding user:", error);
                res.status(500).send(error);
            }
        });

        app.post("/login", async (req, res) => {

            const { username, password } = req.body;
            try {
                // const user = await db.collection.findOne({username : username});
                const registeredUsers = await db.collection("registered-users").find({}).toArray();
                const user = registeredUsers.find(user => user.username === username);

                if (user === null) {
                    console.log("user is null");
                }

                if (user && user.password === password) {
                    console.log("success");
                    res.status(200).json({ success: true });
                }
                else {
                    console.log("failure");

                    res.status(200).json({ success: false });
                }
            } catch (error) {
                console.log("Error authentificating user:", error);
                res.status(500).send(error);
            }
        });

        app.post("/createPost", async (req, res) => {
            const { title, description } = req.body;
            const posts = await db.collection("posts").insertOne({ title, description });

        });

        app.get("/posts", async (req, res) => {
            const posts = db.collection("posts");
            const allPosts = await posts.find().toArray();
            res.json(allPosts);
        });

        app.get("/post/:id", async (req, res) => {
            try {
                const postId = req.params.id;
                const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) });

                if (!post) {
                    return res.status(404).send('Post not found');
                }

                const comments = await db.collection("comments").find({ post: new ObjectId(postId) }).toArray();

                res.json({ post, comments });

            }
            catch (error) {
                console.log("Error : ", error);
            }
        });

        app.post("/post/:id/:commentId", async (req, res) => {
            //http://localhost:3001/post/66b3325ee60478ece541889f/66c021661f3c47d01065eb71

            const { author, comment, idOfParentPost, level, idOfParentComment } = req.body;


            const now = new Date();

            // Format the date to include only month, day, year, and time (hh:mm)
            const formattedDate = now.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // or false for 24-hour format
            });


            await db.collection("comments").insertOne({
                author, comment, idOfParentPost,
                level, idOfParentComment, createdAt: formattedDate
            });
        });

        app.post("/postComment", async (req, res) => {
            const { author, comment, idOfParentPost, level } = req.body;

            const now = new Date();

            // Format the date to include only month, day, year, and time (hh:mm)
            const formattedDate = now.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true // or false for 24-hour format
            });

            const idOfParentComment = null;

            await db.collection("comments").insertOne({
                author, comment, idOfParentPost,
                level, idOfParentComment, createdAt: formattedDate
            });


        });

        app.get("/post/:id/comments", async (req, res) => {
            const postId = req.params.id;
            const comments = await db.collection("comments").find({ idOfParentPost: postId }).toArray();

            res.json(comments);

        });


    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process with an error code
    }
}

startServer();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
