import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, DropdownButton, Image, Modal, ProgressBar, Row, Table } from 'react-bootstrap';
import { RiComputerLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { HiDesktopComputer } from 'react-icons/hi';
import { BiUserCircle, BiPurchaseTagAlt } from 'react-icons/bi';
import { MdAccountBox, MdOutlineEditCalendar } from 'react-icons/md';
import style from '../../styles/admin/Statistical.module.css';
import Sidebar from '../../components/management/Sidebar';
import Layout from '../../components/Layout';
import Head from 'next/head';
import PurchasedModal from '../../components/management/Statistical/PurchasedModal';
import VisitModal from '../../components/management/Statistical/VisitModal';
import AccountModal from '../../components/management/Statistical/AccountModal';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function Statistical() {
    const router = useRouter()
    const [accounts, setAccounts] = useState(null)
    const [purchased, setPurchased] = useState(null)
    const [clients, setClients] = useState(null)
    const [filter, setFilter] = useState('This month');
    const [show, setShow] = useState(false);
    const [type, setType] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (param) => {
        setType(param)
        setShow(true)
    };

    const getStatistic = useCallback(async (param) => {
        const token = localStorage.getItem("token")
        let time = ""
        if (param === 'Today') time = 'day'
        if (param === 'This week') time = 'week'
        if (param === 'This month') time = 'month'
        if (param === 'This year') time = 'year'
        try {
            const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/statistic/account?time=${time}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/statistic/purchased?time=${time}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/statistic/client?time=${time}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            const accounts = await res1.json()
            const purchased = await res2.json()
            const clients = await res3.json()
            if (accounts.success === false || purchased.success === false || clients.success === false)
                router.push('/')
            setAccounts(accounts)
            setPurchased(purchased)
            setClients(clients)
        } catch (error) {
            console.log(error);
        }
    }, [router])

    useEffect(() => {
        getStatistic(filter)
    }, [getStatistic, filter])

    function returnGrowth(statisticalObj) {
        function sinceTime() {
            if (filter === 'Today') return 'yesterday'
            if (filter === 'This week') return 'last week'
            if (filter === 'This month') return 'last month'
            if (filter === 'This year') return 'last year'
        }
        const growth = statisticalObj?.growth;
        function returnColor() {
            if (growth !== null) {
                if (statisticalObj?.total === 0 && statisticalObj?.totalOld > 0) return 'red'
                if (growth < 0) return 'red'
                else return 'green'
            }
        }
        return (
            <>
                <span style={{ color: `${returnColor()}`, fontWeight: '700' }}>
                    {
                        (statisticalObj?.total === 0 && statisticalObj?.totalOld > 0) ?
                            '-100%' :
                            (growth !== null && `${growth >= 0 ? `+${growth}` : growth}%`)
                    }
                </span>{' '}
                {growth !== null ? `since ${sinceTime()}` :
                    <span style={{ color: 'gray' }}>
                        {`No record found ${sinceTime()}`}
                    </span>
                }
            </>
        )
    }

    function returnBestSeller() {
        return purchased?.result?.map((item, index) => (
            <Row style={{ marginTop: '8px' }} key={index}>
                <Col xs={3} sm={3} md={3} lg={3}>
                    <div className={style.game_name}>
                        <span>{item.belongToGame.name}:</span>
                    </div>
                </Col>
                <Col xs={9} sm={9} md={9} lg={9}>
                    <ProgressBar className={style.game_prog} variant="warning" now={item.scale?.toFixed(1)} label={`${item.scale?.toFixed(1)}%`} />
                </Col>
            </Row>
        ))
    }

    function render() {
        return (
            <div className={style.wrapper}>
                <h2 className={style.title}>Statistical</h2>

                {/* Phần thống kê ở trên */}
                <div className={style.filter}>
                    <MdOutlineEditCalendar
                        style={{ fontSize: '30px' }}
                    />

                    <p>Filter by : </p>
                    <DropdownButton className={style.dropdown_top} size='sm' title={filter}>
                        <Dropdown.Item onClick={() => setFilter('Today')}>Today</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('This week')}>This week</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('This month')}>
                            This month
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilter('This year')}>This year</Dropdown.Item>
                    </DropdownButton>
                </div>


                <Row className={style.wrapper_card}>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className={style.card} onClick={() => handleShow('acc')}>
                            <Row>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <span className={style.card_title}>{filter.toUpperCase()} NEW ACCOUNT</span>
                                    <h5 className={style.amount}>{accounts?.total} Account{accounts?.total >= 2 ? 's' : ''}</h5>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <BiUserCircle className={style.card_img} style={{ backgroundColor: 'green' }} />
                                </Col>
                            </Row>
                            <div className={style.percentage}>
                                {returnGrowth(accounts)}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className={style.card} onClick={() => handleShow('visit')}>
                            <Row>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <span className={style.card_title}>{filter.toUpperCase()} CLIENT VISIT</span>
                                    <h5 className={style.amount}>{clients?.total} Client{clients?.total >= 2 ? 's' : ''}</h5>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <HiDesktopComputer className={style.card_img} style={{ backgroundColor: 'rgba(255, 98, 138, 0.5)' }} />
                                </Col>
                            </Row>
                            <div className={style.percentage}>
                                {returnGrowth(clients)}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4}>
                        <div className={style.card} onClick={() => handleShow('pur')}>
                            <Row>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <span className={style.card_title}>{filter.toUpperCase()} MONEY</span>
                                    <h5 className={style.amount}>{purchased?.total}$</h5>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <BiPurchaseTagAlt className={style.card_img} style={{ backgroundColor: 'rgba(255, 255, 0, 0.5)' }} />
                                </Col>
                            </Row>
                            <div className={style.percentage}>
                                {returnGrowth(purchased)}
                            </div>
                        </div>
                    </Col>
                </Row>

                <h4 style={{ marginTop: '20px' }}>{`New account's provider ${filter.toLowerCase()} `}<MdAccountBox />:</h4>
                <Row style={{ marginTop: '8px' }}>
                    <Col xs={4} sm={4} md={3} lg={3}>
                        <span style={{
                            backgroundColor: 'rgb(16 68 120)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2px 6px',
                            borderRadius: '2px',
                            userSelect: 'none',
                            width: '100%'
                        }}>
                            <Image
                                alt=""
                                src="/logo.png"
                                height="24"
                                className="d-inline-block align-top"
                            />{' '}
                            Estibew
                        </span>
                    </Col>
                    <Col xs={8} sm={8} md={9} lg={9}>
                        <ProgressBar style={{ height: '100%', backgroundColor: 'inherit' }} animated variant="success" now={accounts?.estibewScale?.toFixed(1)} label={`${accounts?.estibewScale?.toFixed(1)}%`} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '8px' }}>
                    <Col xs={4} sm={4} md={3} lg={3}>
                        <span
                            style={{
                                backgroundColor: '#fff',
                                color: '#333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2px 6px',
                                borderRadius: '2px',
                                userSelect: 'none',
                                width: '100%'
                            }}
                            variant="dark">
                            <FcGoogle />&nbsp;Google
                        </span>
                    </Col>


                    <Col xs={8} sm={8} md={9} lg={9}>
                        <ProgressBar style={{ height: '100%', backgroundColor: 'inherit' }} animated variant="danger" now={accounts?.googleScale?.toFixed(1)} label={`${accounts?.googleScale?.toFixed(1)}%`} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '8px' }}>
                    <Col xs={4} sm={4} md={3} lg={3}>
                        <span
                            style={{
                                backgroundColor: '#2374E1',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2px 6px',
                                borderRadius: '2px',
                                userSelect: 'none',
                                width: '100%'
                            }}
                            variant="success">
                            <BsFacebook />&nbsp;Facebook
                        </span>
                    </Col>
                    <Col xs={8} sm={8} md={9} lg={9}>
                        <ProgressBar style={{ height: '100%', backgroundColor: 'inherit' }} animated variant="primary" now={accounts?.facebookScale?.toFixed(1)} label={`${accounts?.facebookScale?.toFixed(1)}%`} />
                    </Col>
                </Row>

                <h4 style={{ marginTop: '36px' }}>{`Client visit website ${filter.toLowerCase()} `}<RiComputerLine />:</h4>
                <Row style={{ marginTop: '8px' }}>
                    <Col xs={2} sm={2} md={1} lg={1}>
                        <h6>
                            User:
                        </h6>
                    </Col>


                    <Col xs={8} sm={8} md={9} lg={9}>
                        <ProgressBar style={{ height: '100%', backgroundColor: 'inherit' }} animated variant="info" now={clients?.accountScale?.toFixed(1)} label={`${clients?.accountScale?.toFixed(1)}%`} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '8px' }}>
                    <Col xs={2} sm={2} md={1} lg={1}>
                        <h6>
                            Guest:
                        </h6>
                    </Col>
                    <Col xs={8} sm={8} md={9} lg={9}>
                        <ProgressBar style={{ height: '100%', backgroundColor: 'inherit' }} animated variant="secondary" now={clients?.guestScale?.toFixed(1)} label={`${clients?.guestScale?.toFixed(1)}%`} />
                    </Col>
                </Row>

                <h4 style={{ marginTop: '40px' }}>{`Best seller ${filter.toLowerCase()} 💰:`}</h4>
                {returnBestSeller()}
            </div>
        );
    }

    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} md={12} lg={3}>
                    <Sidebar />
                </Col>
                <Col xs={12} sm={12} md={12} lg={9}>
                    {render()}
                </Col>
            </Row>

            {type === 'pur' && <PurchasedModal show={show} handleClose={handleClose} style={style} filter={filter} purchased={purchased} />}
            {type === 'visit' && <VisitModal show={show} handleClose={handleClose} style={style} filter={filter} clients={clients} />}
            {type === 'acc' && <AccountModal show={show} handleClose={handleClose} style={style} filter={filter} accounts={accounts} />}

        </Container>
    );
}

Statistical.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>Management | Statistical</title></Head>
            {page}
        </Layout>
    )
}