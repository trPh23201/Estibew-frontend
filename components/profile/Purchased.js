import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import style from '../../styles/Purchased.module.css'
import Image from "next/image";
import { useRef } from "react";
// import { resignToken, verifyToken } from "../../const/auth.js";
// import { getCookie } from "../../const/cookie";
import { useRouter } from "next/router";
// import { fetchPurchased } from "../../const/fetch";
import moment from "moment";
import { BsDownload } from "react-icons/bs";
import fileDownload from "js-file-download";
import Axios from 'axios';

export default function Purchased({ user, setUser, viewMode }) {
    const totalRef = useRef(0);
    const router = useRouter()

    function download(id, filename) {
        const token = localStorage.getItem("token")
        Axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/download/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, filename);
        }).catch(err => alert(err.toString()))
    }

    function renderGames() {
        totalRef.current = 0
        return user.purchased?.map((game, index) => {
            totalRef.current += game.belongToGame.price
            return (

                <Row className={`${style.item} position-relative`} key={index}>
                    <Col className={style.img_frame} xs={4} sm={4} md={4} lg={4} onClick={() => router.push(`/product_detail?id=${game.belongToGame.id}`)}>
                        <Image priority src={game.belongToGame.image} layout="fill" alt={game.belongToGame.name} ></Image>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8}>
                        <h4><Badge bg="success" >{game.belongToGame.name}</Badge></h4>
                        <h5><Badge bg="dark" >Price: {game.belongToGame.price}$</Badge></h5>
                        <h5><Badge bg="dark" >Purchased date: {moment(game.purchasedDate).format('DD MMM, YYYY')}</Badge></h5>
                    </Col>
                    {viewMode ||
                        <div className="position-absolute d-none d-lg-block"
                            style={{
                                width: 'inherit',
                                bottom: '10px',
                                right: '0',
                            }}>
                            <h6 style={{
                                display: 'inline-block',
                                verticalAlign: 'bottom',
                                margin: '6px'
                            }}>
                                {game.belongToGame.size}
                            </h6>
                            <Button onClick={()=>download(game.belongToGame.id, game.belongToGame.file)} >
                                <BsDownload />
                            </Button>
                        </div>
                    }
                </Row>
            )
        })
    }

    return (
        <Container className={style.frame}>
            {renderGames()}
            {user.purchased?.length !== 0 ? <h2 style={{ textAlign: 'right' }} >Total paid: {totalRef.current.toFixed(2)}$</h2> : ''}
            {user.purchased?.length === 0 ? <h2 style={{ color: 'gray', textAlign: 'center' }}>No purchased found</h2> : ''}
        </Container>
    )
}