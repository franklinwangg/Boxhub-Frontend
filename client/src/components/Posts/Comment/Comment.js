// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
// import "./Comment.css";


// const Comment = (props) => {
//     // {post, author, comment, level, id }

//     const [replyCommentToPost, setReplyCommentToPost] = useState("");


//     const handleReplyToCommentButton = () => {

//         const postId = props.post;
//         const commentId = props.id;

//         fetch(`http://localhost:3001/post/${postId}/${commentId}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 // Add other headers here if necessary, like Authorization
//             },
//             body: JSON.stringify({
//                 author: props.author,
//                 comment: replyCommentToPost,

//                 parentPost : props.parentPost,

//                 idOfParentPost: props.post,
//                 level: props.level + 1,
//                 idOfParentComment: props.id,
//             }),
//         });


//     };

//     const changeReplyCommentToPost = (event) => {
//         setReplyCommentToPost(event.target.value);
//     };

//     return (

//         <div style={{ marginLeft: props.level * 20 + 'px', marginTop: '10px' }}>
//             <input type="text" id="reply-to-comment-box" value={replyCommentToPost}
//                 placeholder="Reply to this comment..." onChange={changeReplyCommentToPost}></input>
//             <button id="reply-to-comment-button" onClick={handleReplyToCommentButton}>Reply</button>

//             <div id="comment-author">Author : {props.author}</div>
//             <div id="comment-contents">Comment : {props.comment}</div>

//             {/* <button id="reply-to-comment-button">Reply</button> */}
//         </div>
//     );
// };

// export default Comment;


import React, { useState } from 'react';
import "./Comment.css";

const Comment = (props) => {
    const [replyCommentToPost, setReplyCommentToPost] = useState("");
    const [showReplyButton, setShowReplyButton] = useState(false);

    const handleReplyToCommentButton = async () => {
        const postId = props.post;
        const commentId = props.id;

        try {
            const response = await fetch(`http://localhost:3001/post/${postId}/${commentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author: props.author,
                    comment: replyCommentToPost,
                    parentPost: props.parentPost,
                    idOfParentPost: props.post,
                    level: props.level + 1,
                    idOfParentComment: props.id,
                }),
            });

            if (response.ok) {
                setReplyCommentToPost(""); // Clear input after successful post
            } else {
                console.error("Failed to post reply");
            }
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    const changeReplyCommentToPost = (event) => {
        setReplyCommentToPost(event.target.value);
    };

    const handleClickReplyButton = () => {
        setShowReplyButton(true);
    };

    const handleClickSubmitReplyButton = async () => {
        const postId = props.post;
        const commentId = props.id;

        try {
            const response = await fetch(`http://localhost:3001/post/${postId}/${commentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author: props.author,
                    comment: replyCommentToPost,
                    parentPost: props.parentPost,
                    idOfParentPost: props.post,
                    level: props.level + 1,
                    idOfParentComment: props.id,
                }),
            });

            if (response.ok) {
                setReplyCommentToPost(""); // Clear input after successful post
            } else {
                console.error("Failed to post reply");
            }
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    return (
        <div className="comment-container" style={{ marginLeft: props.level * 20 + 'px' }}>
            <div className="comment-box">
                <div className="comment-author">Author: {props.author}</div>
                <div className="comment-contents">{props.comment}</div>
            </div>


            <div className="reply-section">
                {showReplyButton && (
                    <div>
                        <input
                            type="text"
                            className="reply-input"
                            value={replyCommentToPost}
                            placeholder="Reply to this comment..."
                            onChange={changeReplyCommentToPost}
                        />

                        <button className="submit-reply-button" onClick={handleClickSubmitReplyButton}>
                            Submit
                        </button>
                    </div>
                )
                }

                {!showReplyButton && (
                    <button className="reply-button" onClick={handleClickReplyButton}>
                        Reply
                    </button>
                )}

            </div>
        </div>
    );
};

export default Comment;
