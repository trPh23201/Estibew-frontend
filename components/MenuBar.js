import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BsBagFill, BsPersonCircle } from "react-icons/bs"
import Cart from "./Cart";
import { toggleCart } from "../features/reducerShowCart";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MenuBar() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            async function fetchUser() {
                try {
                    const res = await fetch(${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/verify_token, {
                        method: 'POST',
                        headers: {
                            'Authorization': Bearer ${token}
                        },
                    })
                    const me = await res.json()
                    !me.username ? setUser(me.email.split("@")[0]) : setUser(me.username)
                } catch (error) {
                    console.log(error)
                    localStorage.removeItem("token")
                }
            }
            fetchUser()
        }
    }, [])

    function handleLogout() {
        localStorage.removeItem("token")
        router.reload()
    }

    function handleProfile() {
        // const data = verifyToken(token);
        // if (!data) resignToken()
        // router.push('/profile')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link href='/' passHref><Navbar.Brand>Estibew</Navbar.Brand></Link>
                    <Nav className="me-auto">
                        <Link href={`/home/discover`} passHref><Nav.Link>Home</Nav.Link></Link>
                        {admin ? <Link href='/management/accounts' passHref><Nav.Link>Management</Nav.Link></Link> : ''}
                        <Link href='/about' passHref><Nav.Link>About</Nav.Link></Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={() => dispatch(toggleCart(true))} >
                            <BsBagFill style={{ verticalAlign: "initial" }} /> Cart
                        </Nav.Link>&nbsp;
                        {user ?
                            <>
                                <Nav.Link onClick={() => handleProfile()} >
                                    <BsPersonCircle style={{ verticalAlign: "middle" }} /> {user}
                                </Nav.Link>
                                <Nav.Link onClick={() => handleLogout()} >Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Link href='/login' passHref><Nav.Link>Login</Nav.Link></Link>
                                <Link href='/register' passHref><Nav.Link>Register</Nav.Link></Link>
                            </>
                        }
                    </Nav>
                </Container>
            </Navbar>
            <Cart setToken={val => setToken(val)} />
        </>
    )
}