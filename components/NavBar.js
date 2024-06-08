import Link from "next/link";
import styles from "../styles/NavBar.module.css"

export default function NavBar(){
    return(
        <div>
            <Link href="/login"><h1>login</h1></Link>
            <Link href="/register"><h1>register</h1></Link>
            <Link href="/"><h1>home</h1></Link>
        </div>
    )
}
