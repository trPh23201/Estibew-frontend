import Layout from "../components/Layout"
import { Col, Container, Row } from "react-bootstrap";
import Infomation from "../components/profile/Infomation";
import { useEffect, useRef, useState } from "react";
import DashBoard from "../components/profile/DashBoard";
import Purchased from "../components/profile/Purchased";
import WishList from "../components/profile/WishList";
import Reviews from "../components/profile/Reviews";
import Settings from "../components/profile/Settings";
import Head from "next/head";
import { useRouter } from "next/router";
import Notification from "../components/profile/Notification";

export default function Profile({ userId }) {
    const [info, setInfo] = useState(false)
    const [purc, setPurc] = useState(false)
    const [revi, setRevi] = useState(false)
    const [wish, setWish] = useState(false)
    const [sett, setSett] = useState(false)
    const [noti, setNoti] = useState(false)
    const viewMode = useRef(null)
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        async function fetchUser() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/${userId}`, {
                    ...(token && {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                })
                const data = await res.json()
                if (data) {
                    viewMode.current = data.viewMode
                    setUser(data.user)

                    const { path } = router.query
                    if (path === 'purchased') setPurc(true)
                    else if (path === 'wishlist') setWish(true)
                    else if (path === 'review') setRevi(true)
                    else if (path === 'notification' && !viewMode) setNoti(true)
                    else if (path === 'setting' && !viewMode) setSett(true)
                    else setInfo(true)
                }
            } catch (error) {
                router.push('/')
            }
        }
        fetchUser()
    }, [userId, router, user?.id])

    function handleClick(type) {
        setInfo(type === 'info' ? true : false)
        setPurc(type === 'purc' ? true : false)
        setRevi(type === 'revi' ? true : false)
        setWish(type === 'wish' ? true : false)
        setSett(type === 'sett' ? true : false)
        setNoti(type === 'noti' ? true : false)
    }

    const lg = () => {
        if (info) return 9;
        if (purc) return 9;
        if (revi) return 9;
        if (wish) return 9;
        if (sett) return 9;
        if (noti) return 9;
    }

    const md = () => {
        if (info) return 8;
        if (purc) return 12;
        if (revi) return 12;
        if (wish) return 12;
        if (sett) return 8;
        if (noti) return 8;
    }

    const sm = () => {
        if (info) return 12;
        if (purc) return 12;
        if (revi) return 12;
        if (wish) return 12;
        if (sett) return 12;
        if (noti) return 12;
    }

    return (
        <Container style={{ minHeight: '369px', paddingTop: '6px' }}>
            <Row style={{ marginTop: '30px' }}>
                <Col sm={12} md={4} lg={3} style={{ color: 'white', marginTop: '20px' }}>
                    <DashBoard
                        handleClick={val => handleClick(val)}
                        info={info}
                        purc={purc}
                        revi={revi}
                        wish={wish}
                        sett={sett}
                        noti={noti}
                        viewMode={viewMode.current}
                    />
                </Col>
                <Col sm={sm()} md={md()} lg={lg()} style={{ color: 'white', marginTop: '20px' }}>
                    {user ?
                        <>
                            {info && <Infomation user={user} setUser={setUser} viewMode={viewMode.current} />}
                            {sett && <Settings user={user} setUser={setUser} />}
                            {noti && <Notification user={user} setUser={setUser} />}
                            {revi && <Reviews user={user} setUser={setUser} viewMode={viewMode.current} />}
                            {wish && <WishList user={user} setUser={setUser} viewMode={viewMode.current} />}
                            {purc && <Purchased user={user} setUser={setUser} viewMode={viewMode.current} />}
                        </>
                        : <h1 style={{ textAlign: 'center', color: 'grey' }}>User cant be found ...</h1>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    return {
        props: {
            userId: id
        }
    }
}

Profile.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>Profile</title></Head>
            {page}
        </Layout>
    )
}