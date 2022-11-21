import { Col, Container, Image, Row, Toast } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs"
import style from "../../styles/Reviews.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Reviews({ game }) {
    const [gameLocal, setGameLocal] = useState(null) //FIX React-hydration-error

    useEffect(() => {
        setGameLocal(game)
    }, [game])

    function renderAgo(jsonDate) {
        const past = new Date(jsonDate).getTime();
        const now = new Date().getTime();
        const seccond = 1000;
        const minute = seccond * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const seccondAgo = Math.floor((now - past) / seccond);
        const minuteAgo = Math.floor((now - past) / minute);
        const hourAgo = Math.floor((now - past) / hour);
        const dayAgo = Math.floor((now - past) / day);
        const weekAgo = Math.floor((now - past) / week);

        if (seccondAgo < 10) return `Just now`
        else if (seccondAgo < 60) return `${seccondAgo} secconds ago`
        else if (minuteAgo < 60) return `${minuteAgo} minute${minuteAgo > 1 ? 's' : ''} ago`
        else if (hourAgo < 24) return `${hourAgo} hour${hourAgo > 1 ? 's' : ''} ago`
        else if (dayAgo < 7) return `${dayAgo} day${dayAgo > 1 ? 's' : ''} ago`
        else return `${weekAgo} week${weekAgo > 1 ? 's' : ''} ago`
    }

    function renderReviews() {
        return gameLocal?.reviews.map((el, key) => {
            return (
                <Col sm={12} md={6} lg={6} key={key}>
                    <Toast className={style.toast} >
                        <Toast.Header className={style.header} closeButton={false}>
                            <Link href={`/profile?id=${el.userId}`} passHref>
                                <strong className={`${"me-auto"} ${style.user_badge} ${style.center_ver}`}>
                                    {el.belongToUser.avatar ?
                                        <Image alt="" className={style.avatar} src={el.belongToUser.avatar} /> :
                                        <BsPersonCircle className={style.icon} />
                                    }&nbsp;
                                    {el.belongToUser.username?.length === 0 ? 'Guest' : el.belongToUser.username}
                                </strong>
                            </Link>
                            <small className="text-muted">{renderAgo(el.created)}</small>
                        </Toast.Header>
                        <Toast.Body className={style.body}>
                            <h4 className={el.like ? style.rate : style.non_rate}>
                                {el.like ?  <Image alt="" src="/icon_thumbsUp_v6.png"/> :  <Image alt="" src="/icon_thumbsDown_v6.png"/>}
                                &nbsp;
                                {el.like ? <span>Recommend</span> : <span>Not Recommend</span>}
                            </h4>
                            <span className={style.comment_body}>{el.comment}</span>
                        </Toast.Body>
                    </Toast>
                </Col >
            )
        })
    }

    return (
        <Container>
            <Row>
                {renderReviews()}
                {game?.reviews.length === 0 && <h1 className={style.no_comment} >No comments yet be the first one!</h1>}
            </Row>
        </Container>
    )
}