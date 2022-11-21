import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, Button, Pagination as Pagi, Container, Image, Row, Col, Form } from 'react-bootstrap';
import { BsFillEyeFill, BsFillUnlockFill } from 'react-icons/bs';
import { FaBan } from 'react-icons/fa';
import Layout from '../../components/Layout';
import Sidebar from '../../components/management/Sidebar';
import style from '../../styles/admin/User.module.css';

export default function Users() {
    const router = useRouter()
    const [users, setUsers] = useState(null)
    const [page, setPage] = useState(1)
    const [currentPage, setCurrenPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getUsers = useCallback(async (page, username) => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/user?_page=${page}&_limit=10${username ? `&username_like=${username}` : ''}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const users = await res.json()

            if (users.success === false) router.push('/')
            setUsers(users.data)
            setCurrenPage(users.currentPage)
            setTotalPage(users.totalPage)
        } catch (error) {
            console.log(error)
        }
    }, [router])

    useEffect(() => {
        getUsers(page)
    }, [getUsers, page])

    function paginate(i) {
        setPage(i)
    }

    async function handleUnban(id) {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/user/${id}/unban`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            alert(data.message)
            if (data.success) {
                const temp = [...users].map(user => {
                    if (user.id === id) return { ...user, banned: false }
                    else return user
                })
                console.log(temp);
                setUsers(temp)
            }
        } catch (error) {
            alert(error.toString())
        }
    }

    async function handleBan(id) {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/user/${id}/ban`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            alert(data.message)
            if (data.success) {
                const temp = [...users].map(user => {
                    if (user.id === id) return { ...user, banned: true }
                    else return user
                })
                console.log(temp);
                setUsers(temp)
            }
        } catch (error) {
            alert(error.toString())
        }
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

    function handleSearch(e) {
        if (e.key === 'Enter') {
            getUsers(page, e.target.value)
        }
    }

    function renderUser() {
        return users?.map((user, key) => {
            return (
                <tr key={key}>
                    <td style={{ filter: `brightness(${user.banned ? '0.3' : '1'})` }} className={style.text_center}>{user.id}</td>
                    <td style={{ filter: `brightness(${user.banned ? '0.3' : '1'})` }}>
                        <div className={`${style.item_center}`}>
                            <Image src={user.avatar || '/user.png'} alt={user.name} />
                            <div className={`${style.info}`}>
                                <div className={style.text_strong}>{user.username}</div>
                                <div>{user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td style={{ filter: `brightness(${user.banned ? '0.3' : '1'})` }} className={style.text_center}>{user.phone}</td>
                    <td className={style.text_center}>
                        <div
                            className={
                                user.banned ? style.red : style.primary
                            }
                        >
                            {user.banned ? "BANNED" : "NORMAL"}
                        </div>
                    </td>

                    <td className={style.text_center}>
                        <Link href={`/profile?id=${user.id}`} passHref>
                            <Button size='sm'><BsFillEyeFill /></Button>
                        </Link>{' '}
                        {
                            user.banned ?
                                <Button onClick={() => handleUnban(user.id)} variant="success" size="sm"><BsFillUnlockFill /></Button>
                                :
                                <Button onClick={() => handleBan(user.id)} variant="danger" size='sm'><FaBan /></Button>
                        }
                    </td>
                </tr>
            );
        })
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
                            </Col>
                        </Row>
                        <Table borderless className={style.table}>
                            <thead className={style.text_center}>
                                <tr>
                                    <th>ID</th>
                                    <th>Infomation</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderUser()}
                            </tbody>
                        </Table>
                        {users?.length > 0 ?
                            <Pagi className={style.pagination}>
                                {currentPage == 1 || <Pagi.First onClick={() => paginate(1)} />}
                                {currentPage == 1 || <Pagi.Prev onClick={() => paginate(currentPage * 1 - 1)} />}
                                {totalPage == 1 || renderPagi()}
                                {currentPage == totalPage || <Pagi.Next onClick={() => paginate(currentPage * 1 + 1)} />}
                                {currentPage == totalPage || <Pagi.Last onClick={() => paginate(totalPage)} />}
                            </Pagi> :
                            <h2 style={{ color: 'gray', textAlign: 'center' }}>No user found</h2>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

Users.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>Management | Users</title></Head>
            {page}
        </Layout>
    )
}