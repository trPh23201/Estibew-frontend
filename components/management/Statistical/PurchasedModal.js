import { Button, Container, Modal, Table } from "react-bootstrap";
import moment from 'moment'

export default function PurchasedModal({ show, handleClose, style, filter, purchased }) {
    const total = 0;
    function returnPurchased() {
        return purchased.result?.map((item, index) => {
            function renderTags() {
                return item.belongToGame.tags?.map((tag, index) => {
                    if (index < 2) {
                        return `${tag.name}, `
                    }
                    if (index === 2) {
                        return `${tag.name}`
                    }
                    if (index === 3) {
                        return '...'
                    }
                })
            }
            total += item.total
            return (
                <tr key={index}>
                    <td>{item.belongToGame.id}</td>
                    <td>{item.belongToGame.name}</td>
                    <td>{renderTags()}</td>
                    <td>{moment(item.belongToGame.released).format("DD MMM, YYYY")}</td>
                    <td>{item.quantity}</td>
                    <td>{item.total}$</td>
                    <td>{item.scale}%</td>
                </tr>
            )
        })
    }

    return (
        <Modal show={show} onHide={handleClose} fullscreen={true}>
            <Modal.Header className={style.modal_head} closeButton>
                <Modal.Title>
                    <span style={{ marginLeft: '20px' }}>{filter.toUpperCase()} PURCHASED</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modal_body}>
                <Container>
                    <Table striped bordered hover variant="dark" size='sm' className={style.table}>
                        <thead>
                            <tr>
                                <th>GameID</th>
                                <th>Games</th>
                                <th>Tag</th>
                                <th>Released</th>
                                <th>Amount</th>
                                <th>Total money</th>
                                <th>OC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnPurchased()}
                        </tbody>
                    </Table>
                    <h3 style={{ textAlign: 'right' }} >Total money: {total}$</h3>
                </Container>
            </Modal.Body>
        </Modal>
    )
}