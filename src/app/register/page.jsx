// "use client";

// import { useState } from "react";
// import NavBar from "../../../components/NavBar";
// import axios from "axios";

// export default function registerPage() {

//     const [ registerUsername, setRegisterUsername ] = useState('');
//     const [ registerPassword, setRegisterPassword ] = useState('');

//     const register = () => {
//         axios({
//             method:"post",
//             data: {
//                 username: registerUsername,
//                 password: registerPassword
//             },
//             withCredentials: true,
//             url: "http://localhost:3006/register"
//         }).then((res) => console.log(res)).catch(( err) => console.log(err));
//     }

//     return (
//         <main>
//             {console.log(registerUsername)}
//             <NavBar></NavBar>
//             <h2>register</h2>
//             <input type="text" name="username" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
//             <input type="password" name="password" placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
//             <button onClick={register}>register</button>
//         </main> 
//     )
// }

'use client';
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'


export default function RegisterPage() {
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
                    <label className = {styles.emailText} htmlFor="email">Email:</label>
                    <input 
                        className = {styles.emailBox}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
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