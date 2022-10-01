import Head from "next/head"
import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Discover</title>
            </Head>
            <Footer></Footer>
        </>
    )
}