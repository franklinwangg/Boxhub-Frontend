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

                const fetchedPosts = await fetch("http://localhost:3001/posts");
                if (fetchedPosts.ok) {
                    const fetchedPostsJson = await fetchedPosts.json();
                    // const fetchedPostsArray = fetchedPostsJson.toArray();
                    setPosts(fetchedPostsJson);
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
                    <div className="post" key={post._id}>
                        <h2>
                            <Link to={`/post/${post._id}`} state={{ _id: post._id, title: post.title, description: post.description }}>
                                {post.title}
                            </Link>
                        </h2>
                        <p>{post.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default Homepage;