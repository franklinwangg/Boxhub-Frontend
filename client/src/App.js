
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/UserAuthentification/Login/Login'; // Adjust path as necessary
import Register from './components/UserAuthentification/Register/Register'; // Adjust path as necessary
import Homepage from './components/Pages/Homepage/Homepage';
import CreatePost from './components/Pages/CreatePost/CreatePost';
import Post from './components/Posts/Post/Post';

// import {UserProvider } from './context/UserContext';
import UserProvider from './context/UserProvider';

function App() {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />

        </Routes>
      </UserProvider>
    </Router>



  );
}

export default App;
