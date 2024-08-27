const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');


router.post("/login", async (req, res) => {
    try {
        console.log("trying to log in");
        const { username, password } = req.body;

        const result = await req.client.query
            ("SELECT * FROM users WHERE username = $1", [username]);


        if (result.rows.length === 0) { 
            return res.status(404).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password_hash);
        if (isMatch) {
            res.status(200).json({ success : true, message: "Login successful" });
        }
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/", async (req, res) => {
    // create new user
    try {
        const { username, password } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await req.client.query
            ("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *", [username, hashedPassword]);

        res.json(result);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});




// GET /users: Retrieve a list of users.
// GET /users/:id: Retrieve a specific user by ID.
// POST /users: Create a new user.
// PUT /users/:id: Update an existing user by ID.
// DELETE /users/:id: Delete a user by ID.

module.exports = router;


// app.post("/register", async (req, res) => {

//     const { username, password } = req.body;
//     try {
//         console.log("Adding new user :", { username, password });

//         const result = await db.collection("registered-users").insertOne({ username, password });

//         console.log("User added successfully");
//     } catch (error) {
//         console.log("Error adding user:", error);
//         res.status(500).send(error);
//     }
// });