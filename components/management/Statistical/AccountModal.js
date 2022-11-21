import { Badge, Button, Container, Modal, Table } from "react-bootstrap";

export default function AccountModal({ show, handleClose, style, filter, accounts }) {
    function returnAccounts() {
        return accounts.result?.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.phone}</td>
                    <td>{item.provider || "estibew"}</td>
                    <td>
                        <Badge bg={item.isEmailVerified || item.provider  ? "success" : "danger"}>
                            {item.isEmailVerified || item.provider ? "Verified" : "Unverified"}
                        </Badge>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
            <Modal.Header className={style.modal_head} closeButton>
                <Modal.Title>
                    <span style={{ marginLeft: '20px' }}>{filter.toUpperCase()} NEW ACCOUNT</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modal_body}>
                <Container>
                    <Table striped bordered hover variant="dark" size='sm' className={style.table}>
                        <thead>
                            <tr>
                                <th>UserID</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Login via</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnAccounts()}
                        </tbody>
                    </Table>
                    <h3 style={{ textAlign: 'right' }} >Total purchased: {'239.25'}$</h3>
                </Container>
            </Modal.Body>
        </Modal>
    )
}