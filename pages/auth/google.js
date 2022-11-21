import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../../components/Layout"

export default function Google() {
    const router = useRouter()
    const { authuser, code, prompt, scope } = router.query

    useEffect(() => {
        async function getToken() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/authGoogle/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`)
            const data = await res.json()
            if (data.success) {
                localStorage.setItem("token", data.token)
                router.push('/')
            } else {
                alert(data.message)
            }
        }
        if (authuser || code || prompt || scope) getToken()
    })

    return (
        <div style={{minHeight: '400px'}}>
            <h1></h1>
        </div>
    )
}

Google.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
