import Head from "next/head"
import Footer from "./Footer"
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newNotification } from "../features/reducerNotification";
import MenuBar from "./MenuBar";

export default function Layout({ children }) {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT, {
            ...(token && {
                query: `token=${token}`
            })
        })
        socket.on('notification', (data) => {
            console.log(data);
            dispatch(newNotification(data.notification))
        })
        return () => {
            socket.off('notification');
        };
    }, [dispatch])

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Estibew</title>
            </Head>
            <MenuBar />
            <div style={{marginTop: '48px'}}></div>
            <main>{children}</main>
            <Footer />
        </>
    )
}