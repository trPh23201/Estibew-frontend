import Link from "next/link";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BsBagFill, BsPersonCircle, BsFillPeopleFill, BsFillHouseFill, BsFillInfoCircleFill } from "react-icons/bs"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { GiArchiveRegister } from "react-icons/gi"
import Cart from "./Cart";
import { toggleCart } from "../features/reducerShowCart";
import { useRouter } from "next/router";
import { fetchUser, resignToken, verifyToken } from "../utils/auth";
import { useEffect, useState } from "react";
import { eraseCookie, getCookie } from "../utils/cookie";
import style from "../styles/Menubar.module.css";

export default function MenuBar() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        async function fetchUser() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/get-me`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const me = await res.json()
                me.username ? setUser(me.username) : setUser(me.email.split("@")[0])
                me.avatar && setAvatar(me.avatar)
            } catch (error) {
                // console.log(error)
                localStorage.removeItem("token")
            }
        }
        if (token) fetchUser()

        // if (token) {
        //     const data = verifyToken(token);
        //     if (data) {
        //         data.name === '' ? setUser(data.email.split("@")[0]) : setUser(data.name)
        //         setAdmin(data.admin)
        //     }
        //     else {
        //         resignToken()
        //         setToken(getCookie("token"))
        //     }
        // } else setToken(getCookie("token"))
    }, [])

    function handleLogout() {
        localStorage.removeItem("token")
        router.reload()
    }

    function handleProfile() {
        const data = verifyToken(token);
        if (!data) resignToken()
        router.push('/profile')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className={style.center_ver} >
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
                            {/* {
                                admin ? <Link href='/management/accounts' passHref>
                                    <Nav.Link>Management</Nav.Link>
                                </Link> : ''
                            } */}
                            <Link href={`/community`} passHref>
                                <Nav.Link className={style.center_ver} >
                                    <BsFillPeopleFill />&nbsp;Community
                                </Nav.Link>
                            </Link>
                            <Link href='/about' passHref>
                                <Nav.Link className={style.center_ver} >
                                    <BsFillInfoCircleFill />&nbsp;About Us
                                </Nav.Link>
                            </Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            <Nav.Link className={style.center_ver} onClick={() => dispatch(toggleCart(true))} >
                                <BsBagFill />&nbsp;Cart
                            </Nav.Link>
                            {user ?
                                <>
                                    <Nav.Link className={style.center_ver} onClick={() => handleProfile()}  >
                                        {avatar ?
                                            <Image alt="" className={style.img} src={avatar} /> :
                                            <BsPersonCircle />
                                        }
                                        &nbsp;{user}
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
                                            <GiArchiveRegister/>&nbsp;Register
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