import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Comment.css";


function Comment() {

    const location = useLocation();

    return (
        <div className="comment-container">
            <div id="comment-content">{location.state.comment}</div>
            <div id="comment-author">{location.state.author}</div>
            <div id="comment-time"> {/* Time placeholder, if needed */}</div>
        </div>
    );
}

export default Comment;