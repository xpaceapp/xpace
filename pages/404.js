import Link from "next/link";
import styles from '../styles/404.module.css'
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Error() {
    const router = useRouter()

    // useEffect(() => {
    //     setTimeout(() => {
    //         // router.go(1)
    //         // router.go(-1)
    //         router.push("/")
    //     }, 3000)
    // }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 Error</h1>
            <Link href="/"><p className={styles.text}>Go back to Home Page</p></Link>
        </div>
    )
}
