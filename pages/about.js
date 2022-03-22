import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>About Page</h1>
            <Link href="/"><p>Go back home</p></Link>
        </div>
    )
}
