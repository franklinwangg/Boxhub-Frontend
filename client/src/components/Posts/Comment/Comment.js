import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Comment.css";


const Comment = (props) => {
    // {post, author, comment, level, id }
    console.log(props.post);
    console.log("comment ", props.comment);
    console.log("id ", props.id);

    const [replyCommentToPost, setReplyCommentToPost] = useState("");


    const handleReplyToCommentButton = () => {

        const postId = props.post;
        const commentId = props.id;

        console.log("post Id ", postId);
        console.log("comment Id ", commentId);

        fetch(`http://localhost:3001/post/${postId}/${commentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Add other headers here if necessary, like Authorization
            },
            body: JSON.stringify({
                author: props.author,
                comment: replyCommentToPost,

                parentPost : props.parentPost,

                idOfParentPost: props.post,
                level: props.level + 1,
                idOfParentComment: props.id,
            }),
        });
        

    };

    const changeReplyCommentToPost = (event) => {
        setReplyCommentToPost(event.target.value);
    };

    return (

        <div style={{ marginLeft: props.level * 20 + 'px', marginTop: '10px' }}>
            <input type="text" id="reply-to-comment-box" value={replyCommentToPost}
                placeholder="Reply to this comment..." onChange={changeReplyCommentToPost}></input>
            <button id="reply-to-comment-button" onClick={handleReplyToCommentButton}>Reply</button>

            <div id="comment-author">Author : {props.author}</div>
            <div id="comment-contents">Comment : {props.comment}</div>

            {/* <button id="reply-to-comment-button">Reply</button> */}
        </div>
    );
};

export default Comment;