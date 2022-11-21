import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
// import { resignToken, updateProfile, verifyToken } from "../../const/auth";
// import { getCookie } from "../../const/cookie";
// import { rsaDecrypt, rsaEncrypt } from "../../const/rsa";
import style from "../../styles/Settings.module.css"

export default function Settings({ user, setUser }) {

    async function handleSave(type) {
        const isHide = user.privacy[0][type]
        setUser({ ...user, privacy: [{ ...user.privacy[0], [type]: !isHide }] })

        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/privacy/${user.privacy[0].id}/update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [type]: !isHide
            })
        })
        const data = await res.json()
        if (!data.success) {
            alert(data.message)
        }
    }

    return (
        <Container>
            <h2>Notification settings</h2>
            <Row className={user.privacy[0].notificationInfo ? style.setting_active : style.setting}>
                <Col xs={10} sm={10} md={10} lg={9}>
                    <h4>{"Don't disturb when updating my infomation"}</h4>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} className={style.switch_frame} >
                    <Form.Check
                        checked={user.privacy[0].notificationInfo ? true : false}
                        className={style.switch}
                        type="switch"
                        id="custom-switch"
                        onChange={() => handleSave('notificationInfo')}
                    />
                </Col>
            </Row>
            <Row className={user.privacy[0].notificationSetting ? style.setting_active : style.setting}>
                <Col xs={10} sm={10} md={10} lg={9}>
                    <h4>{"Don't disturb when updating settings"}</h4>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} className={style.switch_frame} >
                    <Form.Check
                        checked={user.privacy[0].notificationSetting ? true : false}
                        className={style.switch}
                        type="switch"
                        id="custom-switch"
                        onChange={() => handleSave('notificationSetting')}
                    />
                </Col>
            </Row>
            <h2 style={{marginTop: '60px'}} >Private settings</h2>
            <Row className={user.privacy[0].purchased ? style.setting_active : style.setting}>
                <Col xs={10} sm={10} md={10} lg={5}>
                    <h4 >Hide my purchased</h4>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} className={style.switch_frame} >
                    <Form.Check
                        checked={user.privacy[0].purchased ? true : false}
                        className={style.switch}
                        type="switch"
                        id="custom-switch"
                        onChange={() => handleSave('purchased')}
                    />
                </Col>
            </Row>
            <Row className={user.privacy[0].review ? style.setting_active : style.setting}>
                <Col xs={10} sm={10} md={10} lg={5}>
                    <h4 >Hide all reviews</h4>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} className={style.switch_frame} >
                    <Form.Check
                        checked={user.privacy[0].review ? true : false}
                        className={style.switch}
                        type="switch"
                        id="custom-switch"
                        onChange={() => handleSave('review')}
                    />
                </Col>
            </Row>
            <Row className={user.privacy[0].wishlist ? style.setting_active : style.setting}>
                <Col xs={10} sm={10} md={10} lg={5}>
                    <h4 >Hide wishList</h4>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} className={style.switch_frame} >
                    <Form.Check
                        checked={user.privacy[0].wishlist ? true : false}
                        className={style.switch}
                        type="switch"
                        id="custom-switch"
                        onChange={() => handleSave('wishlist')}
                    />
                </Col>
            </Row>
        </Container>
    )
}