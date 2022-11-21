import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Stack } from "react-bootstrap";
import style from "../../styles/Choose.module.css";

export default function Choose() {
    const router = useRouter()
    const { pathname, asPath } = router;
    const { _page, _limit, _sort, _order, _tags, name } = router.query;
    const [keyWord, setKeyWord] = useState(name ? name : '')

    useEffect(()=>{
        const token = localStorage.getItem("token")
        async function active(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
                ...(token && {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
            })
            await res.json()
        }
        active()
    },[])

    async function search(e) {
        if (e.key === 'Enter') {
            router.push(
                `/home/browsers?` +
                (
                    (_page && _limit && _sort && _order) ?
                        `_page=${1}&_limit=${_limit}&_sort=${_sort}&_order=${_order}` :
                        '_page=1&_limit=15&_sort=sold&_order=desc'
                ) +
                (_tags ? `&_tags=${_tags}` : '') +
                (keyWord !== '' ? `&name=${keyWord}` : ''),
                undefined, { shallow: pathname === '/home/browsers' ? true : false }
            )
        }
    }

    return (
        <div className={style.layout}>
            <Container >
                <Row>
                    <Col sm={12} md={10} lg={6}>
                        <Stack direction="horizontal" gap={3}>
                            <Link href={pathname === '/home/discover' ? asPath : '/home/discover'} passHref>
                                <span className={pathname === '/home/discover' ?
                                    `${style.text} ${style.active}` :
                                    `${style.text} ${style.inactive}`}>
                                    Discover
                                </span>
                            </Link>
                            <Link href={pathname === '/home/browsers' ? asPath : '/home/browsers?_page=1&_limit=15&_sort=sold&_order=desc'} passHref>
                                <span className={pathname === '/home/browsers' ?
                                    `${style.text} ${style.active}` :
                                    `${style.text} ${style.inactive}`}>
                                    Browsers
                                </span>
                            </Link>
                            <Form.Control type="text"
                                size="lg"
                                className={style.searchForm}
                                placeholder="Search ..."
                                value={keyWord}
                                onChange={(e) => setKeyWord(e.target.value)}
                                onKeyPress={(e) => search(e)}
                            />
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}