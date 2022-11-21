import { Col, Row, Badge, Button, ToastContainer, Toast, Spinner } from "react-bootstrap";
import Image from "next/image";
import style from "../../styles/WishList.module.css"
import { BsTrashFill, BsCartPlusFill } from "react-icons/bs"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// import { fetWishlist } from "../../const/fetch";
// import { removeWish, resignToken, verifyToken } from "../../const/auth";
// import { getCookie } from "../../const/cookie";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/reducerCart";
import { toggleCart } from "../../features/reducerShowCart";


export default function WishList({ user, setUser, viewMode }) {
    const [backup, setBackup] = useState(null)
    const [pop, setPop] = useState('')
    const [removing, setRemoving] = useState(false)
    const timerRef = useRef();
    const [idForUnmount, setIdForUnmount] = useState(null) //Delete even unmount
    const router = useRouter()
    const dispatch = useDispatch()

    function findIndex(state, id) {
        var temp = -1;
        state.forEach((st, index) => {
            if (st.id === id) temp = index;
        })
        return temp
    }

    // useEffect(() => {
    //     return () => clearTimeout(timerRef.current)
    // })

    async function deleteWish(id) {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/wishlist/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await res.json()
        if (!data.success) {
            alert("Somethig wrong ... try again or later")
            handleCancel()
        }
    }

    function handleCancel() {
        clearTimeout(timerRef.current);
        setUser(backup)
        setPop('')
        setRemoving(false)
    }

    async function handleRemove(id, name) {
        if (!removing) {
            setPop(name)
            setBackup(user)
            const index = findIndex(user.wishlist, id)
            var arr = [...user.wishlist]
            arr.splice(index, 1)

            setUser({ ...user, wishlist: arr })
            setRemoving(true)
            setIdForUnmount(id)

            timerRef.current = setTimeout(() => {
                deleteWish(id)
                setRemoving(false)
                setPop('')
            }, 3000)
        }
    }

    function handleCart(game) {
        dispatch(addProduct(game.belongToGame))
        dispatch(toggleCart(true))
    }

    function renderGames() {
        return user.wishlist?.map((game, key) => (
            <Row className={style.item} key={key}>
                <Col className={style.img_frame} xs={4} sm={4} md={4} lg={4} onClick={() => router.push(`/product_detail?id=${game.belongToGame.id}`)}>
                    <Image priority src={game.belongToGame.image} layout="fill" alt={game.belongToGame.name} ></Image>
                </Col>
                <Col xs={6} sm={6}  md={7} lg={7}>
                    <h4><Badge bg="success" >{game.belongToGame.name}</Badge></h4>
                    <h5><Badge bg="dark" >Price: {game.belongToGame.price}$</Badge></h5>
                </Col>
                <Col xs={2} sm={2} md={1} lg={1}>
                    {viewMode || <Button variant="danger" onClick={() => handleRemove(game.id, game.belongToGame.name)}><BsTrashFill /></Button>}
                    <Button variant="primary" onClick={() => handleCart(game)} ><BsCartPlusFill /></Button>
                </Col>
            </Row>
        ))
    }
    return (
        <>
            {renderGames()}
            {user.wishlist?.length === 0 ? <h2 style={{ color: 'gray', textAlign: 'center' }}>No game in wishlist</h2> : ''}
            {pop !== '' &&
                <div className={style.pop} >
                    <ToastContainer className="p-3" position="bottom-end">
                        <Toast className={style.body}>
                            <Toast.Header closeButton={false}>
                                <Spinner animation="border" size="sm" />&emsp;
                                <strong className="me-auto">
                                    Removing {pop} ...
                                </strong>
                                <small>
                                    <Button variant="dark" size="sm" onClick={() => handleCancel()}>Cancel</Button>
                                </small>
                            </Toast.Header>
                        </Toast>
                    </ToastContainer>
                </div>
            }
        </>
    )
}



