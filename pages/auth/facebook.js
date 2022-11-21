import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../../components/Layout"

export default function Facebook() {
    const router = useRouter()
    const { code } = router.query

    useEffect(() => {
        async function getToken() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/authFacebook/callback?code=${code}`)
            const data = await res.json()
            if (data.success) {
                localStorage.setItem("token", data.token)
                router.push('/')
            } else {
                alert(data.message)
            }
        }
        if (code) getToken()
    })

    return (
        <div style={{minHeight: '400px'}}>
            <h1></h1>
        </div>
    )
}

Facebook.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}