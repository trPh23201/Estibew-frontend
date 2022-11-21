import { Button, Col, Container, ListGroup, Modal, Row, Table } from "react-bootstrap";
import moment from "moment";

export default function VisitModal({ show, handleClose, style, filter, clients }) {
    function returnLog() {
        return clients.result?.map((item, index) => {
            return (
                <p key={index}>
                    <span style={{ color: `${item.userId ? "yellow" : "green"}` }}>{moment().format('MMMM Do YYYY, h:mm:ss a')}: </span>
                    {item.userId ? `User with id ${item.userId} - Login via ${item.provider}` : "Guest account"}
                    {' '}- ip: {item.ip}
                </p>
            )
        })
    }

    return (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
            <Modal.Header className={style.modal_head} closeButton>
                <Modal.Title>
                    <span style={{ marginLeft: '20px' }}>{filter.toUpperCase()} VISIT</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modal_body}>
                <Container>
                    <div className={style.terminal}>
                        <h4 style={{ marginBottom: '24px' }}>All visitor:</h4>
                        {returnLog()}
                    </div>
                </Container>
            </Modal.Body>
        </Modal>
    )
}