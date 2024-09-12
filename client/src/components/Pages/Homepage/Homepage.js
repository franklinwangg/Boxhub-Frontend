import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Homepage.css";
// import personIcon from "./personicon.png";
import UserContext from '../../../context/UserContext';
import HeaderBar from '../../Others/HeaderBar';



function Homepage() {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const { username, setUsername } = useContext(UserContext); // Access username and setUsername from context
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    // const [loggedIn, setLoggedIn] = useState([]);

    useEffect(() => {
        // fetch the data
        // display it on "recent-boxing-news"

        const fetchPosts = async () => {
            try {

                const fetchedPosts = await fetch("http://localhost:5000/api/posts/");
                if (fetchedPosts.ok) {
                    const fetchedPostsJson = await fetchedPosts.json();

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

    const handleLPBClick = () => {
        try {
            navigate("/Login");
        } catch (error) {
            console.error("Error during navigating to CNP page :", error);
        }
    };

    const openLogoutButton = () => {
        setShowLogoutButton(true);
    };

    const logOut = () => {
        setUsername(null);
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
                {posts.map((post) => {
                    return (
                        <div className="post" key={post.id}> {/* Ensure post.id is unique */}
                            <h2>
                                <Link to={`/post/${post.id}`} state={{ id: post.id, title: post.title, article_url: post.article_url, image_url: post.image_url }}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p>{post.content}</p>
                        </div>
                    );
                })}

            </div>
        </div>
    );

}

export default Homepage;