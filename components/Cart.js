import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import style from "../styles/Cart.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillTrashFill } from "react-icons/bs"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleCart } from "../features/reducerShowCart";

export default function Cart() {
    const cart = useSelector(state => state.cart);
    const show = useSelector(state => state.showCart);
    const dispatch = useDispatch()
    const router = useRouter()

    async function handleBuy(token) {

    }

    function handlePush(id) {
        dispatch(toggleCart(false))
        router.push(/product_detail?id=${id})
    }

    var totalPrice = 0;
    function renderGame() {
        return cart?.map((el, key) => {
            totalPrice += el.price
            return (
                <Row className={style.row} key={key}>
                    <Col sm={4} className={style.img_frame}>
                        <Image priority src={el.image} layout="fill" alt={el.name} onClick={() => handlePush(el.id)} ></Image>
                    </Col>
                    <Col sm={5} >
                        <h4>{el.name}</h4>
                    </Col>
                    <Col sm={2}>
                        <h4>{el.price}$</h4>
                    </Col>
                    <Col sm={1}>
                        <Button variant="danger" onClick={() => dispatch(remove(el.id))}>
                            <BsFillTrashFill className={style.remove} />
                        </Button>
                    </Col>
                </Row>
            )
        })
    }

    return (
        <Modal
            show={show}
            onHide={() => dispatch(toggleCart(false))}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Cart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    {renderGame()}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <h4>Total price: {totalPrice.toFixed(2)}$</h4>&emsp;
                <Button variant="success" >Buy now</Button>
                <Button variant="warning">Remove all</Button>
            </Modal.Footer>
        </Modal>
    );
}
