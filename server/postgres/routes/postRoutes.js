const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');


// http://localhost:5000/api/posts/

router.get("/", async (req, res) => {
    try {

        console.log("1");
        const result = await req.client.query("SELECT * FROM posts");
        res.status(200).json(result);

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