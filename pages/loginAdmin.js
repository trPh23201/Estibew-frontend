import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Layout from "../components/Layout";

export default function LoginAdm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) router.push('/')
    })

    async function handleLogin() {
        if (email === '' || password === '') alert("Please enter adminName and password")
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/login?admin=yes`, {
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 min-vh-100 d-flex flex-column" style={{ marginTop: '70px' }}>
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div className="card rounded shadow shadow-sm">
                                <div className="card-header" style={{ marginTop: '10px' }}>
                                    <h3>Admin login</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="uname1">Username</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control form-control-lg rounded-0" name="username" id="username" required />
                                    </div>
                                    <div className="form-group" style={{ marginTop: '10px' }}>
                                        <label>Password</label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control form-control-lg rounded-0" id="password" required="password" autoComplete="new-password" />
                                    </div>
                                    <Stack className="mx-auto" style={{ marginTop: '20px' }}>
                                        <Button variant="success" onClick={() => handleLogin()}>
                                            Login
                                        </Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

LoginAdm.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}