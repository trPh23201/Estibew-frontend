import { useEffect, useRef, useState } from "react"
import { Modal, Button, Form, Stack, Row, Col } from "react-bootstrap"
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Layout from "../components/Layout";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [forgot, setForgot] = useState(false)
    const forgotRef = useRef()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) router.push('/')
    })

    async function handleLogin() {
        if (email === '' || password === '') alert("Please enter your email and password")
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            alert(data.message)
            if (data.success) {
                localStorage.setItem("token", data.token)
                router.push('/')
            }
        }
    }

    function handleGoogleLogin() {
        window.open(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/authGoogle`, "_self")
    }

    function handleFacebookLogin() {
        window.open(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/authFacebook`, "_self")
    }

    async function handleForgot() {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/forgot_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotRef.current.value, url: 'newpassword' })
            })
            const data = await res.json()
            alert(data.message)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal.Dialog style={{paddingTop: '28px', minHeight: '555px'}}>
                <Modal.Header style={{ justifyContent: 'center' }}>
                    <Modal.Title >Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ position: 'relative' }} >
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ display: 'flex', justifyContent: 'space-between' }} >
                                <span>Password:</span>
                                <span style={{
                                    color: '#6c70ff',
                                    fontSize: '12px',
                                    alignSelf: 'flex-end',
                                    cursor: 'pointer'
                                }}
                                    onClick={() => setForgot(true)}
                                >
                                    Forgot password?
                                </span>
                            </Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" value={password} />
                        </Form.Group>
                    </Form>
                    <Stack className="mx-auto">
                        <Button variant="success" onClick={() => handleLogin()}>
                            Login
                        </Button>
                    </Stack>
                    <div style={{ textAlign: "center", marginTop: '10px' }} >
                        Don’t have an account? <Link href='/register' >Register</Link>&emsp;
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
                                onClick={() => handleGoogleLogin()}>
                                <FcGoogle />&nbsp;Log in with Google
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
                                onClick={() => handleFacebookLogin()}>
                                <BsFacebook />&nbsp;Log in with Facebook
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal.Dialog>
            <Modal
                fullscreen={'lg-down'}
                show={forgot}
                onHide={() => setForgot(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Forgot password:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control ref={forgotRef} type="email" placeholder="Enter your email..." />
                    <Form.Text className="text-muted">
                        &nbsp;Notice that admin will never ask your password!
                    </Form.Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleForgot} variant="primary">Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}