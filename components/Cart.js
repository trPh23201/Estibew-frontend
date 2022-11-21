import { Modal, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import style from "../styles/Cart.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillTrashFill } from "react-icons/bs"
import { useDispatch } from "react-redux";
import { remove, removeAll } from "../features/reducerCart";
import { useSelector } from "react-redux";
import { toggleCart } from "../features/reducerShowCart";
import { useState } from "react";

export default function Cart({ token, setToken }) {
    const cart = useSelector(state => state.cart);
    const show = useSelector(state => state.showCart);
    const [spin, setSpin] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    async function handleBuy() {
        if (cart.length === 0) alert('Nothing to buy')
        else {
            setSpin(true)
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/payment/create`, {
                method: 'POST',
                ...(token && {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }),
                body: JSON.stringify({
                    cart,
                    success: `${process.env.NEXT_PUBLIC_CLIENT_ENDPOINT}/thankyou`,
                    cancel: `${process.env.NEXT_PUBLIC_CLIENT_ENDPOINT}`
                })
            })
            const check = await res.json()
            if (check.success === false) {
                alert(check.message)
                setSpin(false)
            }
            else {
                localStorage.setItem("payId", check.id)
                router.push(check.url)
            }
        }
    }

    function handlePush(id) {
        dispatch(toggleCart(false))
        router.push(`/product_detail?id=${id}`)
    }

    var totalPrice = 0;
    function renderGame() {
        return cart?.map((el, key) => {
            totalPrice += el.price
            return (
                <Row className={style.row} key={key}>
                    <Col xs={4} sm={4} className={style.img_frame}>
                        <Image priority src={el.image} layout="fill" alt={el.name} onClick={() => handlePush(el.id)} ></Image>
                    </Col>
                    <Col xs={5} sm={5} >
                        <h4>{el.name}</h4>
                    </Col>
                    <Col xs={2} sm={2}>
                        <h4>{el.price}$</h4>
                    </Col>
                    <Col xs={1} sm={1}>
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
            fullscreen={'lg-down'}
            show={show}
            onHide={() => dispatch(toggleCart(false))}
            size="lg"
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
                {spin ?
                    <Button variant="success" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        {' '}Buy....
                    </Button> :
                    <Button variant="success" onClick={() => handleBuy()} >Buy now</Button>
                }
                <Button variant="warning" onClick={() => dispatch(removeAll())}>Remove all</Button>
            </Modal.Footer>
        </Modal>
    );
}