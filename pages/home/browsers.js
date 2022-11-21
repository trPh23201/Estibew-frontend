import Choose from "../../components/home/Choose";
import Layout from "../../components/Layout"
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Products from "../../components/home/Products";
import TagList from "../../components/home/browsers/TagList";
import SortDropdown from "../../components/home/browsers/SortDropdown";
import Pagination from "../../components/home/browsers/Pagination";
import { queryByEnterUrl } from "../../utils/query";
import { useRouter } from "next/router";
import style from "../../styles/Browser.module.css"

export default function Browsers({ gamesList, tags, totalPage, currentPage }) {
    const [games, setGames] = useState(gamesList)
    const [current, setCurrent] = useState(currentPage)
    const [total, setTotal] = useState(totalPage)
    const router = useRouter()
    const { _page, _limit, _sort, _order, _tags, name } = router.query

    const notInitialRender = useRef(false)
    useEffect(() => {
        if (notInitialRender.current) {
            async function fetchItem() {
                const token = localStorage.getItem("token")
                const query = queryByEnterUrl(_page, _limit, _sort, _order, _tags, name)
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/game?${query}`, {
                    ...(token && {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                })
                const gamesList = await res.json()
                setGames(gamesList.data)
                setTotal(gamesList.totalPage)
                setCurrent(_page)
            }
            fetchItem()
        } else {
            notInitialRender.current = true
        }
    }, [_page, _limit, _sort, _order, _tags, name])

    return (
        <div>
            <Choose
                setGames={data => setGames(data)}
                setTotal={data => setTotal(data)}
                setCurrent={data => setCurrent(data)}
            />
            <Container>
                <Row className={style.frame}>
                    <Col lg={9} md={9} sm={12}>
                        <Row>
                            <SortDropdown />
                            <Products games={games} colSm={12} colMd={6} colLg={4} />
                            {games.length === 0 ? '' :
                                <Pagination totalPage={total} currentPage={current} />
                            }
                        </Row>
                    </Col>
                    <Col lg={3} md={3} sm={12} >
                        <TagList tags={tags} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const { _page, _limit, _sort, _order, _tags, name } = context.query;
        const query = queryByEnterUrl(_page, _limit, _sort, _order, _tags, name)
        const res1 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/game?${query}`)
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/tag`)
        const games = await res1.json()
        const tags = await res2.json()
        if (games.success === false || tags.success === false) return { notFound: true }
        if (!_page || !_limit || !_sort || !_order)
            return { redirect: { destination: '/home/browsers?_page=1&_limit=15&_sort=sold&_order=desc' } }

        return {
            props: {
                gamesList: games.data,
                tags,
                totalPage: games.totalPage,
                currentPage: games.currentPage,
            }
        }
    } catch {
        return { notFound: true }
    }
}

Browsers.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Head><title>Browsers</title></Head>
            {page}
        </Layout>
    )
}