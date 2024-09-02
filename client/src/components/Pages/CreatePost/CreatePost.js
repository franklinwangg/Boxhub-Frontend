import React, { useState } from 'react';
import "./CreatePost.css";

import { Link } from 'react-router-dom';


function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreatePostButtonClick = () => {

        console.log("1");
        fetch("http://localhost:5000/api/posts/createPost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
        console.log("2");

    };

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };

    return (
        <div className="container">
            <input
                id="create-new-post-title-input"
                placeholder="Title"
                onChange={changeTitle}
            ></input>
            <input
                id="create-new-post-optional-description-input"
                placeholder="Optional Description"
                onChange={changeDescription}
            ></input>
            <button
                id="create-new-post-submit-button"
                onClick={handleCreatePostButtonClick}
            >
                Create New Post
            </button>
        </div>
    );
    
}

export default CreatePost;
