'use client';
import React from 'react';
import styles from "./page.module.css"; // Import your CSS module
import Image from "next/image";
import Head from 'next/head';



const AboutUs = () => {
  return (

    
    <div className={styles.aboutUsContainer}>
            <Head>
        <title>bfdob</title>
      </Head>
      <h1 className={styles.header}>About Us</h1>
      <div className={styles.paragraphContainer}>
        <p className={styles.paragraphText}>
          We are a duo of programmers from De Anza College.
        </p>
        <p className={styles.paragraphText}>
          Over a few months, we learned web development using ChatGPT,
          w3schools, and online resources, and created this demo website using
          React JS, Next JS, CSS, MySQL, and more to showcase our skills.
        </p>
        <p className={styles.paragraphText}>
          Despite challenges, our teamwork and mutual support made it possible.
        </p>
      </div>

      <div className={styles.additionalContent}>
        <div className={styles.box}>
          
        <Image
      src="/appleLogo.jpg"
      width={500}
      height={500}
    />          
    <p>
            Hi! I'm Franklin, a first-year De Anza student (expected graduation 2025).
            I designed the frontend, routing functionalities, and ____ of the website.
            In my free time, I like to work out, play instruments, design projects, and
            I'm also a huge boxing nerd!
            (Check out my Youtube channel at ___)
          </p>
        </div>
        <div className={styles.box}>
          <h2>Box 2</h2>
          <p>
            This is the content of Box 2.
            Replace this text with your desired content for Box 2.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


// import React from 'react';
// import Head from 'next/head';

// const MyPage = () => {
//   return (
//     <div>
//       <Head>
//         <title>Custom Page Title</title>
//       </Head>
//       <h1>Welcome to My Page</h1>
//       <p>This is a custom page with a custom title.</p>
//     </div>
//   );
// };

// export default MyPage;