'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div>
      <a
        href="/about"
        className={styles.topRightLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        About Us
      </a>

      <main>
        <h1 className={styles.bonheurLogo}>~ bonheur</h1>
        
        <div className={styles.imageContainer}>
          <img src="/romanticbeach.jpg" id="romanticbeach" className={styles.beachImage} />
          <div className={styles.whiteBox}>

          <h1 className = {styles.whiteBoxText1}>Find Love Today</h1>
          <h1 className = {styles.whiteBoxText2}>Start meeting new people in your area! If you already have an account, sign in to use Bonheur on the web.</h1>
            <div className={styles.buttonContainer}> {/* Place button container inside white box */}
              <button type="button" className={styles.registerButton} onClick={() => router.push('/register')}>
                Register
              </button>
              <button type="button" className={styles.loginButton} onClick={() => router.push('/login')}>
                Login
              </button>
            </div>
          </div>
        </div>

        <div>
  <h1 className={styles.aboutTheWebsiteMessage}>How To Use The Website</h1>
  <div className={styles.boxContainer}>
    <div className={styles.box}>Register and Login</div>
    <div className={styles.box}>Swiping</div>
    <div className={styles.box}>Messaging</div>
  </div>
</div>
      </main>
    </div>
  );
}