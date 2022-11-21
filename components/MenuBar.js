import Link from "next/link";
import { Navbar, Nav, Container, Image, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsBagFill, BsPersonCircle, BsFillPeopleFill, BsFillHouseFill, BsFillInfoCircleFill, BsBellFill, BsDot } from "react-icons/bs"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { GoPrimitiveDot } from "react-icons/go";
import { GiArchiveRegister } from "react-icons/gi"
import Cart from "./Cart";
import { toggleCart } from "../features/reducerShowCart";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "../styles/Menubar.module.css";
import { getAllNotification } from "../features/reducerNotification";
import { FaQuestionCircle } from "react-icons/fa";
import moment from 'moment'

export default function MenuBar() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)
    const notification = useSelector(state => state.notification)

    useEffect(() => {
        const token = localStorage.getItem("token")
        async function fetchUser() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/get-me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const me = await res.json()
                if (me.success === false) throw new Error(me.message)
                setUser(me)
                if(me.role > 0) setAdmin(true)
                dispatch(getAllNotification(me.notification))
            } catch (error) {
                console.log(error)
                localStorage.removeItem("token")
            }
        }
        if (token) fetchUser()
    }, [dispatch])

    function handleLogout() {
        localStorage.removeItem("token")
        router.reload()
    }

    function handleProfile() {
        if (router.pathname === "/profile" && router.query.id != user.id) {
            router.push(`/profile_redirect?id=${user.id}`)
        } else if (router.pathname !== "/profile") {
            router.push(`/profile?id=${user.id}`)
        }
    }

    function renderNotification() {
        return notification.map((item, key) => (
            <ListGroup.Item className={style.item} variant="dark" key={key} onClick={() => handleProfile()}>
                <Row style={{ alignItems: 'center' }}>
                    <Col xs={2} sm={2} md={2} lg={2}>
                        {/* <AiFillSetting style={{ fontSize: '30px' }} /> */}
                        <Image alt="" style={{ width: '100%' }} src={item.image} />
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10}>
                        <span>{item.title}</span>
                    </Col>
                </Row>
            </ListGroup.Item>
        ))
    }

    function renderDot() {
        if (notification.length !== 0) {
            const notiDate = moment(notification[0].created)
            const readDate = moment(user.user_read[0].lastRead)
            if (readDate.diff(notiDate) < 0)
                return <GoPrimitiveDot className={style.dot} />
        }
    }

    async function hoverNoti() {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user_read/read`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await res.json()
            setUser({ ...user, user_read: [result] })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar style={{position: 'fixed', width: '100%', top: '0', zIndex: '99'}} bg="dark" variant="dark" expand="lg" className={style.center_ver} >
                <Container>
                    <Link href={`/home/discover`} passHref>
                        <Navbar.Brand href="/home/discover">
                            <Image
                                alt=""
                                src="/logo.png"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Estibew
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href={`/home/discover`} passHref>
                                <Nav.Link className={style.center_ver} >
                                    <BsFillHouseFill />&nbsp;Home
                                </Nav.Link>
                            </Link>
                            <Link href={`/faq`} passHref>
                                <Nav.Link className={style.center_ver} >
                                    <FaQuestionCircle />&nbsp;FAQS
                                </Nav.Link>
                            </Link>
                            <Link href='/about' passHref>
                                <Nav.Link className={style.center_ver} >
                                    <BsFillInfoCircleFill />&nbsp;About Us
                                </Nav.Link>
                            </Link>
                            {
                                admin ? <Link href='/management/statistical' passHref>
                                    <Nav.Link>Management</Nav.Link>
                                </Link> : ''
                            }
                        </Nav>
                        <Nav className="justify-content-end">
                            {user &&
                                <Nav.Link className={`${style.center_ver} ${style.noti}`} onMouseEnter={hoverNoti}>
                                    {renderDot()}
                                    <BsBellFill />&nbsp;Notification
                                    <ListGroup className={style.noti_sub}>
                                        {renderNotification()}
                                        {notification?.length > 0 &&
                                            <ListGroup.Item className={style.button} action onClick={() => handleProfile()}>
                                                See all notifications ...
                                            </ListGroup.Item>
                                        }
                                    </ListGroup>
                                </Nav.Link>
                            }
                            <Nav.Link className={style.center_ver} onClick={() => dispatch(toggleCart(true))} >
                                <BsBagFill />&nbsp;Cart
                            </Nav.Link>
                            {user ?
                                <>
                                    <Nav.Link className={style.center_ver} onClick={() => handleProfile()}  >
                                        {user.avatar ?
                                            <Image alt="" className={style.img} src={user.avatar} /> :
                                            <BsPersonCircle />
                                        }
                                        &nbsp;{user.username === '' ? user.email.split("@")[0] : user.username}
                                    </Nav.Link>
                                    <Nav.Link className={style.center_ver} onClick={() => handleLogout()} >
                                        <BiLogOut />&nbsp;Logout
                                    </Nav.Link>
                                </>
                                :
                                <>
                                    <Link href='/login' passHref>
                                        <Nav.Link className={style.center_ver} >
                                            <BiLogIn />&nbsp;Login
                                        </Nav.Link>
                                    </Link>
                                    <Link href='/register' passHref>
                                        <Nav.Link className={style.center_ver} >
                                            <GiArchiveRegister />&nbsp;Register
                                        </Nav.Link>
                                    </Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Cart />
        </>
    )
}