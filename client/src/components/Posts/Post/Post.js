import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import "./Post.css";

function Post() {
    const navigate = useNavigate();
    const location = useLocation();
    const [comments, setComments] = useState([]);
    const [commentToPost, setCommentToPost] = useState("");

    const {username, setUsername} = useContext(UserContext);

    useEffect(() => {

        const postId = location.state._id;
        console.log("post id : ", postId);
        console.log("location state : ", location.state);

        const fetchComments = async () => {

            const fetchedComments = await fetch(`http://localhost:3001/post/${postId}/comments`);
            const resolvedFetchedComments = await fetchedComments.json();

            const commentsArray = Array.isArray(resolvedFetchedComments) ? resolvedFetchedComments : [resolvedFetchedComments];

            setComments(commentsArray);
        };
        fetchComments();
    }, []);

    const handleSubmitCommentButton = () => {

        const author = username;

        const comment = commentToPost;
        const idOfParentPost = location.state._id;



        fetch("http://localhost:3001/postComment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: author,
                comment: comment,
                idOfParentPost: idOfParentPost,
            })
        });

    };

    const handleReplyCommentButton = () => {
        // const currentCommentLevel;

    };

    const changeCommentToPost = (event) => {
        setCommentToPost(event.target.value);
    };

    return (
        <div>
            <div id="post-title-and-description-section">
                <div id="post-title-div">{location.state.title}</div>
                <div id="post-description-div">{location.state.description}</div>
            </div>
    
            <input type="text" id="post-new-comment-box" value={commentToPost}
                placeholder="Post comment here" onChange={changeCommentToPost}></input>
            <button id="submit-comment-button" onClick={handleSubmitCommentButton}>Submit</button>
    
            <div id="comments-section">
                <div>Comments ({comments.length}) : </div>
                {comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                        <h2 id = "comment-author">{comment.author}</h2>
                        <p id = "comment-comment">{comment.comment}</p>
                        <p id = "comment-created-at">{comment.createdAt}</p> 
                        <button id = "comment-reply-button" onClick = {handleReplyCommentButton}>Reply</button>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default Post;