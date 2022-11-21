import { Badge, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/reducerCart";
import { toggleCart } from "../../features/reducerShowCart";
import { useState } from "react";
import style from "../../styles/Game.module.css"

export default function Game({ game }) {
    const dispatch = useDispatch()
    const [spin, setSpin] = useState(false)

    function handleCart() {
        dispatch(addProduct(game))
        dispatch(toggleCart(true))
    }

    async function handleWish(id) {
        setSpin(true)
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wishlist/create`, {
                method: 'POST',
                ...(token && {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }),
                body: JSON.stringify({
                    gameId: id
                })
            })
            const result = await res.json()
            setTimeout(() => {
                alert(result.message)
                setSpin(false)
            }, 1000)
        } catch (error) {
            console.log(error);
        }

    }

    function renderTags(tags) {
        return tags.map((tag, key) => (
            <Link href={`/home/browsers?_page=1&_limit=15&_sort=sold&_order=desc&_tags=${tag.id}`} passHref key={key}>
                <span >
                    <Badge bg="primary">{tag.name}</Badge>{' '}
                </span>
            </Link>
        ))
    }

    function renderRelease(jsonDate) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date(jsonDate)
        let month = months[d.getMonth()];
        return `${d.getDate()} ${month}, ${d.getFullYear()}`
    }

    function returnOrigin(arr) {
        return arr.map((value, index) => (
            <Badge bg="success" key={index}>
                {value.name}
            </Badge>
        ))
    }

    return (
        <Container>
            <Row className={style.row}>
                <Col sm={12} md={8} lg={9} className={style.img_frame}>
                    {game.image && <Image priority src={game.image} layout="fill" alt={game.image}></Image>}
                </Col>
                <Col sm={12} md={4} lg={3} className={style.detail}>
                    <p>Released: <Badge bg="success">{renderRelease(game.released)}</Badge></p>
                    <p>Price: <Badge bg="warning" className={style.price}>{game.price}$</Badge></p>
                    <div className={style.tag_frame}>
                        <strong>Tags: </strong>
                        {renderTags(game.tags)}
                    </div>
                    <div className={style.develop}>
                        <p>Developer: &nbsp;
                            {returnOrigin(game.developer)}
                        </p>
                        <p>Publisher: &nbsp;
                            {returnOrigin(game.publisher)}
                        </p>
                    </div>
                    <div className={style.button}>
                        <Button variant="outline-danger" onClick={() => handleCart()}>Add to cart</Button>&ensp;
                        {spin ?
                            <Button variant="warning" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {' '}Adding ........
                            </Button> :
                            <Button variant="outline-warning" onClick={() => handleWish(game.id)}>Wishlist</Button>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    )
}