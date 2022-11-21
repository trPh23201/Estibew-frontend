import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
// import { removeComment, resignToken, verifyToken } from "../../const/auth";
// import { getCookie } from "../../const/cookie";
// import { fetchReviews } from "../../const/fetch";
import style from "../../styles/ReviewsProfile.module.css"

export default function Reviews({ user, setUser, viewMode }) {
    const [show, setShow] = useState(false);
    const [review, setReview] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleView(item) {
        setReview(item)
        handleShow()
    }

    function findIndex(state, id) {
        var temp = -1;
        state.forEach((st, index) => {
            if (st.id === id) temp = index;
        })
        return temp
    }

    async function deleteReview(id) {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/review/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await res.json()
        if (!data.success) {
            alert("Somethig wrong ... try again or later")
            return false
        } else return true
    }

    function handleDelete(id) {
        let confirm = window.confirm("Are you sure want to delele your comment?")
        if (confirm) {
            const index = findIndex(user.review, id)
            var arr = [...user.review]
            arr.splice(index, 1)
            if (deleteReview(id)) setUser({ ...user, review: arr })
        }
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

        if (seccondAgo < 10) return `Just now`
        else if (seccondAgo < 60) return `${seccondAgo} secconds ago`
        else if (minuteAgo < 60) return `${minuteAgo} minute${minuteAgo > 1 ? 's' : ''} ago`
        else if (hourAgo < 24) return `${hourAgo} hour${hourAgo > 1 ? 's' : ''} ago`
        else if (dayAgo < 7) return `${dayAgo} day${dayAgo > 1 ? 's' : ''} ago`
        else return `${weekAgo} week${weekAgo > 1 ? 's' : ''} ago`
    }

    function renderComment(text) {
        if (text.length > 20) return text.slice(0, 20) + "..."
        else return text
    }

    function renderGameName(text) {
        if (text.length > 12) return text.slice(0, 12) + "..."
        else return text
    }

    function renderCommentModal(text) {
        return text?.split('\n').map((str, key) => <span key={key}>{str}<br /></span>)
    }

    function renderReviews() {
        return user.review?.map((el, key) => (
            <tr key={key}>
                <td>{key + 1}</td>
                <td>{renderGameName(el.belongToGame.name)}</td>
                <td>{renderComment(el.comment)}</td>
                <td className={el.like ? style.rate : style.non_rate} >{el.like ? 'YES' : 'NO'}</td>
                <td>{renderAgo(el.created)}</td>
                <td>
                    <Button size="sm" variant="success" onClick={() => handleView(el)} className={style.button}>View</Button> {' '}
                    {viewMode || <Button size="sm" variant="danger" onClick={() => handleDelete(el.id)} className={style.button}>Delete</Button>}
                </td>
            </tr>
        ))
    }

    return (
        <>
            {user.review?.length === 0 ?
                <h2 style={{ color: 'gray', textAlign: 'center' }}>No reivews found</h2> :
                <Table responsive striped bordered hover variant="dark" className={style.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Game</th>
                            <th>Comment</th>
                            <th>Rate</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderReviews()}
                    </tbody>
                </Table>
            }

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className={style.modal}>
                    <Modal.Title><h5>{review?.belongToGame.name}:</h5> <h6 style={{ color: 'gray' }}>{renderAgo(review?.created)}</h6> </Modal.Title>
                </Modal.Header>
                <Modal.Body className={style.modal}>
                    <h4 className={review?.like ? style.rate : style.non_rate}>
                        {review?.like ? "Recomended" : "Not reacommend"}
                    </h4>
                    {renderCommentModal(review?.comment)}
                </Modal.Body>
                <Modal.Footer className={style.modal}>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}