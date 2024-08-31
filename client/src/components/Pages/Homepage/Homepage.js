import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Homepage.css";


function Homepage() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // fetch the data
        // display it on "recent-boxing-news"

        const fetchPosts = async () => {
            try {

                // const response = await fetch("http://localhost:5000/api/users/login", {


                const fetchedPosts = await fetch("http://localhost:5000/api/posts/");
                if (fetchedPosts.ok) {
                    const fetchedPostsJson = await fetchedPosts.json();
                    console.log("FETCHED ", fetchedPostsJson);

                    setPosts(fetchedPostsJson.rows);

                }
                else {
                    console.log("fetched posts not ok");
                }
            }
            catch (error) {
                console.log("Error setting posts equal to fetched posts : ", error);
            }
        };
        fetchPosts();
    }, []);

    const handleCNPPageButtonClick = async () => {
        try {
            navigate("/createPost");
        } catch (error) {
            console.error("Error during navigating to CNP page :", error);
        }
    };

    return (
        <div>
            <button
                id="go-to-create-new-post-page-button"
                onClick={handleCNPPageButtonClick}
            >
                Create New Post
            </button>
            <h1 id="recent-boxing-news">Recent Boxing News</h1>

            <div className="posts-container">
                {posts.map((post) => (
                    <div className="post" key={post.id}> {/* Ensure post.id is unique */}
                        <h2>
                            <Link to={`/post/${post.id}`} state={{ id: post.id, title: post.title, description: post.description }}>
                                {post.title}
                            </Link>
                        </h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Homepage;