'use client';
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'


export default function LoginPage() {
    const router = useRouter()


    const [password, setPassword] = useState("");

    const [username, setUsername] = useState("");
    const handleLogin = () => {
        event.preventDefault(); 
        router.push('/services');

    };

    return (
        <main>
            <h2 className={styles.bonheurlogo}>~ bonheur</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label className = {styles.usernameText} htmlFor="username">Username:</label>
                    <input 
                        className = {styles.usernameBox}
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        
                    />
                </div>
                <div>
                    <label className = {styles.passwordText} htmlFor="password">Password:</label>
                    <input 
                        className = {styles.passwordBox}
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button className = {styles.loginButton} type="submit">Login</button>
            </form>
        </main>
    );
}