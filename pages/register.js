import { useEffect, useState } from "react"
import { Modal, Button, Form, Stack, Row, Col } from "react-bootstrap"
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Layout from "../components/Layout";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) router.push('/')
    })

    async function handleRegister() {
        if (password !== confirm) alert("Password and confirm password doesn't match")
        else if (password.length < 6) alert("Password must be atleast 6 characters or above")
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            alert(data.message)
            data.success && router.push('/login')
        }
    }

    function handleGoogleRegister() {
        window.open(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/authGoogle`, "_self")
    }

    function handleFacebookRegister() {
        window.open(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/authFacebook`, "_self")
    }

    return (
        <Modal.Dialog style={{paddingTop: '28px', minHeight: '555px'}}>
            <Modal.Header style={{ justifyContent: 'center' }}>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirm">
                        <Form.Label>Confirm password:</Form.Label>
                        <Form.Control onChange={e => setConfirm(e.target.value)} value={confirm} type="password" placeholder="Re-enter password" />
                    </Form.Group>
                </Form>
                <Stack className="mx-auto">
                    <Button variant="success" onClick={() => handleRegister()}>
                        Register
                    </Button>
                </Stack>
                <div style={{ textAlign: "center", marginTop: '10px' }} >
                    Areally have acount? <Link href='/login' passHref><a>Log in</a></Link>
                </div>
                <Row style={{ marginTop: '15px' }}>
                    <Col>
                        <Button
                            style={{
                                backgroundColor: '#fff',
                                color: '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                            variant="dark"
                            onClick={() => handleGoogleRegister()}>
                            <FcGoogle />&nbsp;Register with Google
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            style={{
                                backgroundColor: '#2374E1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                            variant="success"
                            onClick={() => handleFacebookRegister()}>
                            <BsFacebook />&nbsp;Register with Facebook
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal.Dialog>
    )
}

Register.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}