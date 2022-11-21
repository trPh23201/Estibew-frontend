import style from "../styles/Product_detail.module.css"
import Layout from "../components/Layout";
import Reviews from "../components/product_detail/Reviews";
import Game from "../components/product_detail/Game";
import PostReview from "../components/product_detail/PostReview";
import Sort from "../components/product_detail/sort";
import { useState } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

export default function Product({ gameItem }) {
    const [game, setGame] = useState(gameItem)
    return (
        <>
            <Head><title>{game.name}</title></Head>
            <Container className={style.layout} style={{paddingTop: '30px'}}>
                <h1 className={style.h1}>{game.name}</h1>
                <Game game={game} />
                <h1 className={style.h1}>ABOUT THIS GAME</h1>
                <p>
                    <span className={style.about}>{game.intro}</span>
                </p>
                <>
                    <h1 className={style.h1}>SYSTEM REQUIREMENTS</h1>
                    <p>OS: {game.requirement.os}</p>
                    <p>Processor: {game.requirement.processor}</p>
                    <p>Memory: {game.requirement.memory}</p>
                    <p>Graphics: {game.requirement.graphic}</p>
                    <p>DirectX: {game.requirement.directx}</p>
                    <p>Storage: {game.requirement.storage}</p>
                </>
                <h1 className={style.h1}>CUSTOMER REVIEWS</h1>
                <PostReview game={game} setGame={(val) => setGame(val)} />
                <Sort game={game} setGame={(val) => setGame(val)} />
                <Reviews game={game} />
            </Container>
        </>
    )
}

export async function getServerSideProps(context) {
    try{
        const { id } = context.query;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/game/${id}`)
        const gameItem = await res.json()
        // const gameItem = res[0]
        // gameItem.reviews.sort((a, b) => {
        //     const count1 = new Date(a.created).getTime();
        //     const count2 = new Date(b.created).getTime();
        //     return count2 - count1
        // })
        if (!gameItem) return { notFound: true }
    
        return {
            props: {
                gameItem,
            }
        }
    } catch {
        return { notFound: true }
    }
}

Product.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}