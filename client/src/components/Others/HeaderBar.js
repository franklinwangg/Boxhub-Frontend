import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import personIcon from "./personicon.png";
import { useNavigate } from "react-router-dom";


const HeaderBar = () => {

    const { username, setUsername } = useContext(UserContext); // Access username and setUsername from context
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const navigate = useNavigate();

    const openLogoutButton = () => {
        setShowLogoutButton(true);
    };
    const handleLPBClick = () => {
        try {
            navigate("/Login");
        } catch (error) {
            console.error("Error during navigating to CNP page :", error);
        }
    };

    const logOut = () => {
        setUsername(null);
    };
    return (

        <div>
            <div id="upper-empty-column"></div>
            <div id="upper-logo-bar">
                <div><h2>RANKINGS</h2></div>
                <div><h2>SCHEDULE</h2></div>
                <div><h2>ABOUT US</h2></div>

                {username == null ? (
                    <div></div>
                )
                    : (
                        <div id="username-text">{username}</div>
                    )}

                <button id="go-to-login-page-button" onClick={username == null ? (handleLPBClick) : (openLogoutButton)}>
                    <img id="person-icon" src={personIcon}></img>
                </button>

                {showLogoutButton ? (
                    <button id="logout-button" onClick={logOut}>Log Out</button>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderBar;