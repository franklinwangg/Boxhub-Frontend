import React, { useState, useEffect } from 'react';
import "./CreatePost.css";

import { Link } from 'react-router-dom';


function CreatePost() {

    const [title, setTitle] = useState("");
    const [content, setcontent] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        // This will run every time `image` is updated
        if (image) {
            console.log("final image : ", image);
            // You can perform other actions based on the updated image here
        }
    }, [image]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    const handleCreatePostButtonClick = () => {

        const formData = new FormData();
        console.log("title : ", title);
        console.log("content : ", content);
        formData.append("title", title);
        formData.append("content", content);

        if (image) {
            formData.append("image", image); // Append the image file
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        fetch("http://localhost:5000/api/posts/createPost", {
            method: "POST",
            body: formData,
        })
    };

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    const changecontent = (event) => {
        setcontent(event.target.value);
    };

    function adjustHeight(event) {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }



    return (
        <div className="container">
            <input
                id="create-new-post-title-input"
                placeholder="Title"
                onChange={changeTitle}
            ></input>
            <textarea
                id="create-new-post-content-input"
                placeholder="Content"
                onChange={changecontent}
                onInput={adjustHeight}
            ></textarea>
            <input type="file" id="image-input" accept="image/*" onChange={handleImageChange} required>

            </input>

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
