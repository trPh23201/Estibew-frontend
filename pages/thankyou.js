import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { removeAll } from "../features/reducerCart";
import style from "../styles/ThankYou.module.css"

export default function ThankYou() {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        async function verify() {
            const payId = localStorage.getItem("payId")
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/payment/verify?id=${payId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            const response = await res.json()
            if (response.success === false) {
                setMessage("Thank you for your visited!")
            }
            else {
                setMessage("Thanks for your purchase\nDownload games in your profile")
                localStorage.removeItem('payId')
                dispatch(removeAll())
            }
        }
        verify()
    }, [])//eslint-disable-line

    return (
        <div className={style.frame}>
            <h1>{message}</h1>
            <Link href={`/home/discover`} passHref><Nav.Link>Click here to continue buying</Nav.Link></Link>
        </div>
    )
}

ThankYou.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>Thank you</title></Head>
            {page}
        </Layout>
    )
}