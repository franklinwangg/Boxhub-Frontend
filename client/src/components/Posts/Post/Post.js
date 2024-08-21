import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Comment from '../Comment/Comment';
import UserContext from '../../../context/UserContext';


const Post = () => {

    const location = useLocation();
    const [comments, setComments] = useState([]);

    const { username, setUsername } = useContext(UserContext);
    const [commentToPost, setCommentToPost] = useState("");
    const [isReadyToRender, setIsReadyToRender] = useState(false);




    useEffect(() => {
        const fetchAndSortComments = async () => {
            const fetchedComments = await fetchComments();
            const sortedComments = sortCommentsOnLevel(fetchedComments);
            setComments(sortedComments);

        };

        fetchAndSortComments();

        setIsReadyToRender(true);
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
                level: 0
            })
        });

    };

    const changeCommentToPost = (event) => {
        setCommentToPost(event.target.value);
    };

    const fetchComments = async () => {
        try {
            const postId = location.state._id;

            const response = await fetch(`http://localhost:3001/post/${postId}/comments`);
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log("Error fetching comments : ", error);
        }
    };

    const sortCommentsOnLevel = (dataComments) => {
        // sort the comments on order, so all 0's in front, then 1's, etc
        const sortedDataComments = dataComments.sort((firstComment, secondComment) => {
            if (firstComment.level > secondComment.level) {
                return 1;
            }
            else if (firstComment.level === secondComment.level) {
                return 0;
            }
            else return -1;
        });
        return sortedDataComments;
    }

    const divideCommentsIntoLevelArrays = () => {
        // first, separate comments into new Level arrays - one array for all Level0's, another for Level1's, etc
        const levelArrays = [];
        var currLevel = 0;
        while (true) {

            const temp = comments.filter((comment) => {
                return comment.level === currLevel;
            });
            if (temp.length === 0) {

                break;
            }
            else {

                levelArrays.push(temp);
                currLevel++;
            }
        }



        return levelArrays;
    };

    const renderEachLevel = (levelArrays, currentComment, level) => {

        console.log("STARTED");

        const renderedComments = [];
        const temp = [];
        // render itself

        renderedComments.push(renderComment(currentComment));

        // if comment is on last level of levelArrays, we need to stop it cuz otherwise will 
        // trigger outOfBounds error
        if (level === levelArrays.length - 1) {

            return renderedComments;
        }
        else {
            // find all matching child comments in next level
            for (let i = 0; i < levelArrays[level + 1].length; i++) {

                if (levelArrays[level + 1][i].idOfParentComment === currentComment._id) { // parentCommentId undefined?

                    // maybe print out levelArrays?
                    console.log("current comment : ", levelArrays[level + 1][i].comment);
                    console.log("child's parent comment id : ", levelArrays[level + 1][i].idOfParentComment);
                    console.log("current comment contents : ", currentComment);
                    console.log("current comment id : ", currentComment._id);

                    temp.push(levelArrays[level + 1][i]);
                }
            }

            // render all of its child comments
            for (let k = 0; k < temp.length; k++) {

                const renderedLevel = renderEachLevel(levelArrays, temp[k], level + 1);
                for(let l = 0; l < renderedLevel.length; l ++) {
                    renderedComments.push(renderedLevel[l]);
                }

                return renderedComments;
                // renderEachLevel(levelArrays, temp[k], level + 1);
            }

            // if no children, then return renderedComments
            return renderedComments;
        }

        // 1) render itself

        // 2) make empty array
        // 3) go through next level array and add any posts whose parentComment matches postId to array
        // 4) for every element in array : 
        // 5) renderComment(postId, level + 1)

    };

    const renderComment = (comment) => {

        return (
            // <Comment />
            <Comment post={location.state._id} author={comment.author} comment={comment.comment} level={comment.level} id={comment._id} />

        );

    };

    const renderComments = () => {
        if (comments.length === 0) {
            console.log("no comments available to render yet");
        }
        else {
            const overallRenderedComments = [];
            const levelArrays = divideCommentsIntoLevelArrays();


            for (let i = 0; i < levelArrays[0].length; i++) {
                console.log("i ", i);
                console.log("element at i : ", levelArrays[0][i].comment);
                const arrayOfRecursiveElementsHTML = renderEachLevel(levelArrays, levelArrays[0][i], 0);
                console.log("LENGTH : ", arrayOfRecursiveElementsHTML.length);
                for(let j = 0; j < arrayOfRecursiveElementsHTML.length; j ++) {
                    console.log("i : ", i, ", j : ", j, " element : ", arrayOfRecursiveElementsHTML[j]);
                    overallRenderedComments.push(arrayOfRecursiveElementsHTML[j]);
                }

                // renderEachLevel(levelArrays, levelArrays[0][i], 0);
            }
            return overallRenderedComments;
        }
    }

    return (
        <div>

            <div id="post-title-and-description-section">
                <div id="post-title-div">{location.state.title}</div>
                <div id="post-description-div">{location.state.description}</div>
            </div>

            <input type="text" id="post-new-comment-box" value={commentToPost}
                placeholder="Post comment here" onChange={changeCommentToPost}></input>
            <button id="submit-comment-button" onClick={handleSubmitCommentButton}>Submit</button>

            <div className="comments-section">
                {isReadyToRender ? renderComments() : <p>Loading comments...</p>}


            </div>
        </div>
    );
}

export default Post;