import { useCallback, useEffect, useState } from "react";
import { Accordion, Button, Card, Form, Image, useAccordionButton, Pagination as Pagi, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BiSortAlt2 } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import styles from '../../styles/Notification.module.css';
import moment from 'moment'

export default function Notification() {
    const [notification, setNotification] = useState([])
    const [checklist, setChecklist] = useState([])
    const [cbAll, setCbAll] = useState(false)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('desc')
    const [currentPage, setCurrenPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const fetchNotification = useCallback(async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/notification?_page=${page}&_limit=10&_sort=created&_order=${order}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await res.json()
            if (result.success === false) throw new Error(result.message)
            setNotification(result.data)
            setCurrenPage(result.currentPage)
            setTotalPage(result.totalPage)
        } catch (error) {
            console.log(error)
        }
    }, [order, page, setTotalPage])

    useEffect(() => {
        fetchNotification()
    }, [fetchNotification])

    function handleCheckall() {
        if (!cbAll) {
            const arrId = notification.map(item => item.id)
            setChecklist(arrId)
            setCbAll(true)
        } else {
            setCbAll(false)
            setChecklist([])
        }
    }

    function findIndex(id) {
        var temp = -1;
        checklist.forEach((item, index) => {
            if (item === id) temp = index;
        })
        return temp
    }

    function handleCheckone(id) {
        const index = findIndex(id)
        const clone = [...checklist]
        if (index !== -1) {
            clone.splice(index, 1)
            setChecklist(clone)
        } else {
            clone.push(id)
            setChecklist(clone)
        }
    }

    async function handleDelete() {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/notification/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checklist)
        })
        const data = await res.json()
        if (data.success) {
            setCbAll(false)
            setChecklist([])
            fetchNotification()
        }
        alert(data.message)
    }

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );
        return (
            <Button
                size="sm"
                variant="dark"
                style={{ float: 'right' }}
                onClick={decoratedOnClick}
            >
                {children}
            </Button>
        );
    }

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

        if (seccondAgo < 60) return `new`
        else if (minuteAgo < 60) return `${minuteAgo}m`
        else if (hourAgo < 24) return `${hourAgo}h`
        else if (dayAgo < 7) return `${dayAgo}d`
        else return `${weekAgo}w`
    }

    function renderNoti() {
        return notification?.map((item, key) => (
            <Accordion key={key}>
                <Card className={styles.noti_frame}>
                    <Card.Header className={styles.noti_head}>
                        <div className={styles.item}>
                            <Form.Check
                                type="checkbox"
                                checked={checklist.includes(item.id)}
                                onChange={() => handleCheckone(item.id)}
                            /> &ensp;&ensp;
                            <Image alt='' src={item.image} /> &nbsp;
                            <span>{item.sender}:</span>  &ensp;
                            <div className={styles.title}>
                                <span>{item.title}</span>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <span style={{ color: 'grey' }}>{renderAgo(item.created)}</span>&nbsp;
                            <CustomToggle eventKey="0">View</CustomToggle>
                        </div>
                    </Card.Header>
                    <Accordion.Collapse className={styles.noti_body} eventKey="0">
                        <Card.Body style={{ whiteSpace: 'pre-line' }}>
                            <span style={{ float: 'right', color: 'grey' }}>{moment(item.created).format("DD MMM, YYYY")}</span>
                            <span>{item.content}</span>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        ))
    }

    function paginate(i) {
        setPage(i)
    }

    function renderPagi() {
        var pagi = []
        for (let i = 1; i <= totalPage; i++) {
            if ((i <= currentPage && i + 3 >= currentPage) || (i >= currentPage && i - 3 <= currentPage)) {
                i === currentPage ?
                    pagi.push(<Pagi.Item active key={i}>{i}</Pagi.Item>) :
                    pagi.push(<Pagi.Item key={i} onClick={() => paginate(i)}>{i}</Pagi.Item>)
            }
        }
        return (pagi)
    }

    return (
        <>
            <div className={styles.action}>
                <Form.Check
                    className={styles.select_btn}
                    type="checkbox"
                    id={`default-checkall`}
                    label={`Select all`}
                    onChange={handleCheckall}
                    checked={cbAll}
                />
                <Button variant='danger' onClick={handleDelete} disabled={checklist.length !== 0 ? false : true} size="sm"><BsTrash /></Button>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id="tooltip">
                            Sort by date
                        </Tooltip>
                    }
                >
                    <Button variant='primary' onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')} size="sm"><BiSortAlt2 /></Button>
                </OverlayTrigger>
            </div>
            {renderNoti()}
            {notification.length > 0 ?
                <Pagi className={styles.pagination}>
                    {currentPage == 1 || <Pagi.First onClick={() => paginate(1)} />}
                    {currentPage == 1 || <Pagi.Prev onClick={() => paginate(currentPage * 1 - 1)} />}
                    {totalPage == 1 || renderPagi()}
                    {currentPage == totalPage || <Pagi.Next onClick={() => paginate(currentPage * 1 + 1)} />}
                    {currentPage == totalPage || <Pagi.Last onClick={() => paginate(totalPage)} />}
                </Pagi> :
                <h2 style={{ color: 'gray', textAlign: 'center' }}>No notification found</h2>
            }
        </>
    )
}