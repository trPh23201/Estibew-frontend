import { Carousel, Col, Container, Image, Row } from "react-bootstrap"

import style from "../../../styles/BestSeller.module.css"

export default function BestSeller({ games }) {
    return (
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Carousel className={style.carousel} interval={1500}>
                        <Carousel.Item>
                            <Image src={games[0]?.image} alt={games[0]?.name} className={style.image} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={games[1]?.image} alt={games[1]?.name} className={style.image} />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image src={games[2]?.image} alt={games[2]?.name} className={style.image} />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>

        </Container>
    )
}