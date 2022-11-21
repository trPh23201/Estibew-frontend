import { useState } from "react"
import { Modal, Button, Form, Stack, Row, Col, Alert } from "react-bootstrap"
import { useRouter } from "next/router";

export default function NewPassword() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const router = useRouter()

    async function handleUpdate() {
        if (password !== confirm) alert("Password and confirm password doesn't match")
        else if (password.length < 6) alert("Password must be atleast 6 characters or above")
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/update_password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${router.query.code}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password, confirm })
            })
            const data = await res.json()
            alert(data.message)
            data.success && router.push('/login')
        }
    }

    return (
        <Modal.Dialog style={{ marginTop: '40px' }}   >
            <Modal.Header style={{ justifyContent: 'center' }}>
                <Modal.Title>New Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="success">
                    <p style={{ textAlign: 'center', marginBottom: '0px' }}>
                        Please create a new password for your account<br />
                        Remember we never ask or share your password.
                    </p>
                </Alert>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Create new password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirm">
                        <Form.Control onChange={e => setConfirm(e.target.value)} value={confirm} type="password" placeholder="Confirm your password" />
                    </Form.Group>
                </Form>
                <Stack className="mx-auto">
                    <Button variant="primary" onClick={() => handleUpdate()}>
                        Change
                    </Button>
                </Stack>
            </Modal.Body>
        </Modal.Dialog>
    )
}

NewPassword.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    )
}