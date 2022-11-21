import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, Stack } from "react-bootstrap";

export default function PostReview({ game, setGame }) {
    const [text, setText] = useState('')
    const [like, setLike] = useState(null)
    const [spin, setSpin] = useState(false)

    async function handlePost() {
        setSpin(true)
        const token = localStorage.getItem("token")
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/review/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comment: text,
                    like: like === 'yes' ? true : false,
                    gameId: game.id,
                    gameName: game.name,
                    gameImg: game.image
                })
            })
            const review = await res.json()
            if (review.success === false) throw new Error(review.message)
            else {
                const clone = { ...game };
                clone.reviews.unshift(review);
                setTimeout(() => {
                    setSpin(false)
                    setGame(clone)
                    setText('')
                }, 1000)
            }
        } catch (error) {
            console.log(error);
            alert(error)
            setSpin(false)
        }
    }

    function validate() {
        if (text.length === 0) alert('Please enter your comment!')
        else if (like === null) alert('Please rate for this game!')
        else handlePost()
    }

    return (
        <Container>
            <Row>
                <Col sm={12} md={6} lg={5}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            placeholder="Write down your comment here!"
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col style={{marginBottom: '10px'}} sm={12} md={3} lg={3} >
                    <h5>Do you like this game?</h5>
                    <Form.Check
                        inline
                        label="Yes"
                        name="group1"
                        type="radio"
                        id="inline-radio-1"
                        defaultChecked={like === 'yes' ? true : false}
                        onClick={() => setLike('yes')}
                    />
                    <Form.Check
                        inline
                        label="No"
                        name="group1"
                        type="radio"
                        id="inline-radio-2`"
                        defaultChecked={like === 'no' ? true : false}
                        onClick={() => setLike('no')}
                    />
                </Col>
                <Col sm={12} md={3} lg={4}>
                    <Stack gap={2} className="col-md-12">
                        {spin ?
                            <Button variant="success" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                {' '}Posting...
                            </Button> :
                            <Button variant="success" onClick={() => validate()} >Post</Button>
                        }
                        <Button variant="secondary" onClick={() => setText('')}>Clear</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}