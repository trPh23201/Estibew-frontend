import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, Button, Pagination as Pagi, Container, Image, Row, Col, Form } from 'react-bootstrap';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import Layout from '../../components/Layout';
import OpenForm from '../../components/management/Product/OpenForm';
import Sidebar from '../../components/management/Sidebar';
import style from '../../styles/admin/Products.module.css';

export default function Products({ }) {
    const router = useRouter()
    const [games, setGames] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [target, setTarget] = useState(null);
    const [page, setPage] = useState(1)
    const [currentPage, setCurrenPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getGames = useCallback(async (page, name) => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/game?_page=${page}&_limit=20${name ? `&name_like=${name}` : ''}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const games = await res.json()

            if (games.success === false) router.push('/')
            setGames(games.data)
            setCurrenPage(games.currentPage)
            setTotalPage(games.totalPage)
        } catch (error) {
            console.log(error)
        }
    }, [router])

    useEffect(() => {
        getGames(page)
    }, [getGames, page])

    function handleOpen(game) {
        setShow(true)
        setTarget(game)
    }

    async function handleDelete(id) {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/game/${id}/delete`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const data = await res.json()
        alert(data.message)
        router.reload()
    }

    function handleSearch(e) {
        if (e.key === 'Enter') {
            getGames(page, e.target.value)
        }
    }

    function renderProduct() {
        return games?.map((game, key) => {
            return (
                <tr key={key}>
                    <td style={{ filter: `brightness(${game.deleted ? '0.5' : '1'})` }} className={style.text_center}>{game.id}</td>
                    <td style={{ filter: `brightness(${game.deleted ? '0.5' : '1'})` }} >
                        <div className={`${style.item_center}`}>
                            <Link href={`/product_detail?id=${game.id}`} passHref>
                                <Image src={game.image} alt={game.name} style={{ cursor: 'pointer' }} />
                            </Link>
                            <div className={`${style.info} ${style.item}`}>
                                <div className={style.text_strong}>
                                    {game.name}
                                </div>
                                <div>Price: {game.price}$</div>
                            </div>
                        </div>
                    </td>
                    <td className={style.text_center}>
                        <div
                            className={
                                game.deleted
                                    ? style.red
                                    : style.primary
                            }
                        >
                            {game.deleted ? "DELETED" : "NORMAL"}
                        </div>
                    </td>

                    <td className={style.text_center}>
                        <Button variant='primary' disabled={game.deleted ? true : false} size='sm' onClick={() => handleOpen(game)}><BsPencilFill /></Button>{' '}
                        <Button variant='danger' disabled={game.deleted ? true : false} size='sm' onClick={() => handleDelete(game.id)}><BsTrashFill /></Button>
                    </td>
                </tr>
            );
        })
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
        <Container>
            <Row>
                <Col xs={12} sm={12} md={12} lg={3}>
                    <Sidebar />
                </Col>
                <Col xs={12} sm={12} md={12} lg={9}>
                    <div className={style.wrapper}>
                        <Row>
                            <Col style={{ paddingLeft: '0px' }}>
                                <Form.Control onKeyPress={(e) => handleSearch(e)} className={style.searchForm} placeholder="Search..." />
                            </Col>
                            <Col>
                                <Button onClick={() => handleOpen(null)} >+ New game</Button>
                            </Col>
                        </Row>
                        <Table borderless className={style.table}>
                            <thead className={style.text_center}>
                                <tr>
                                    <th>ID</th>
                                    <th>Game & Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProduct()}
                            </tbody>
                        </Table>
                        {games?.length > 0 ?
                            <Pagi className={style.pagination}>
                                {currentPage == 1 || <Pagi.First onClick={() => paginate(1)} />}
                                {currentPage == 1 || <Pagi.Prev onClick={() => paginate(currentPage * 1 - 1)} />}
                                {totalPage == 1 || renderPagi()}
                                {currentPage == totalPage || <Pagi.Next onClick={() => paginate(currentPage * 1 + 1)} />}
                                {currentPage == totalPage || <Pagi.Last onClick={() => paginate(totalPage)} />}
                            </Pagi> :
                            <h2 style={{ color: 'gray', textAlign: 'center' }}>No game found</h2>
                        }
                    </div>
                </Col>
            </Row>
            {show ? <OpenForm show={show} style={style} handleClose={handleClose} game={target} /> : ''}
        </Container>
    );
}

Products.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>Management | Products</title></Head>
            {page}
        </Layout>
    )
}
