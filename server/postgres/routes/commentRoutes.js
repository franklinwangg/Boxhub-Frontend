const express = require("express");
const router = express.Router();


// const response = await fetch(`http://localhost:3001/post/${postId}/comments`);

router.get("/:postId", async (req, res) => {
    try {
        const postId = req.params.postId;
        const result = await req.client.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
        // res.status(200).json(result);
        res.status(200).json({ rows: result.rows });


    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

router.post("/:postId", async (req, res) => {
    try {

        console.log("1");
        const postId = req.params.postId; // postId not passed in?
        const username = req.body.author;
        const comment = req.body.comment;
        const level = req.body.level;
        
        const result = await req.client.query(
            "INSERT INTO comments (post_id, author, content, created_at, level) VALUES ($1, $2, $3, NOW(), $4) RETURNING *",
            [postId, username, comment, level]
        );
        
        console.log("2");

        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
    // console.log("here");

});



// http://localhost:5000/api/comments/1/2
// replies
router.post("/:postId/:commentId", async (req, res) => {
    try {
        console.log("1");
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const username = req.body.author;
        const comment = req.body.comment;
        const level = req.body.level;
 
        
        const result = await req.client.query(
        "INSERT INTO comments (post_id, author, content, created_at, level, parent_comment_id) VALUES ($1, $2, $3, NOW(), $4, $5) RETURNING *",
            [postId, username, comment, level, commentId]
        );        
        console.log("2");

        res.status(200).json({ rows: result.rows });


    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

// author: author,
// comment: comment,
// idOfParentPost: idOfParentPost,
// level: 0

// GET /users: Retrieve a list of users.
// GET /users/:id: Retrieve a specific user by ID.
// POST /users: Create a new user.
// PUT /users/:id: Update an existing user by ID.
// DELETE /users/:id: Delete a user by ID.

module.exports = router;