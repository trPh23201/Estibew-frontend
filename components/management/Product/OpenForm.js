import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form, Modal, Row, Col, Image } from "react-bootstrap";


export default function OpenForm({ style, show, handleClose, game }) {
    const [name, setName] = useState(game?.name || '')
    const [released, setReleased] = useState(game?.released || '')
    const [price, setPrice] = useState(game?.price || '')
    const [image, setImage] = useState(game?.image || '')
    const [file, setFile] = useState(game?.file || '')
    const [size, setSize] = useState(game?.size || '')
    const [intro, setIntro] = useState(game?.intro || '')
    const [os, setOs] = useState(game?.requirement?.os || '')
    const [processor, setProcessor] = useState(game?.requirement?.processor || '')
    const [memory, setMemory] = useState(game?.requirement?.memory || '')
    const [graphic, setGraphic] = useState(game?.requirement?.graphic || '')
    const [directx, setDirectx] = useState(game?.requirement?.directx || '')
    const [storage, setStorage] = useState(game?.requirement?.storage || '')
    const [fileImg, setFileImg] = useState(null);
    const router = useRouter()
    const handleFileChange = (event) => {
        console.log('cc');
        setFileImg(event.target.files[0]);
    }

    function renderTags() {
        let text = ""
        game.tags?.map((tag, index) => {
            if (index === 0) text += `${tag.name},`
            else text += ` ${tag.name},`
        })
        return text.slice(0, -1);
    }

    function renderDevelopers() {
        let text = ""
        game.developer?.map((tag, index) => {
            if (index === 0) text += `${tag.name}`
            else text += ` ${tag.name}`
        })
        return text
    }

    function renderPublishers() {
        let text = ""
        game.publisher?.map((tag, index) => {
            if (index === 0) text += `${tag.name}`
            else text += ` ${tag.name}`
        })
        return text
    }

    const [tags, setTags] = useState(game ? renderTags() : '')
    const [developers, setDevelopers] = useState(game ? renderDevelopers() : '')
    const [publishers, setPublishers] = useState(game ? renderPublishers() : '')

    async function handleUpdate(id) {
        let willUpdateImg = false;
        const formdata = new FormData()
        if (fileImg && fileImg?.type.search("image") > -1) {
            formdata.append('gameImg', fileImg)
            willUpdateImg = true
        }

        const token = localStorage.getItem("token")
        let i = 0;
        while (i <= 1) {
            if (i === 1 && !willUpdateImg) break;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/game/${id}/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...(i === 0 && { 'Content-Type': 'application/json' })
                },
                body: i === 0 ? JSON.stringify({
                    name,
                    released: new Date(released).toJSON(),
                    price: parseFloat(price),
                    image,
                    file,
                    size,
                    intro,
                    os,
                    processor,
                    memory,
                    graphic,
                    directx,
                    storage,
                    tags,
                    developers,
                    publishers
                }) : formdata
            })
            i += 1;
            const data = await res.json()
            alert(data.message)
            if (!data.success) break;
        }
        router.push(`/product_detail?id=${id}`)
    }

    async function handleCreate() {
        let willUpdateImg = false;
        const formdata = new FormData()
        if (fileImg && fileImg?.type.search("image") > -1) {
            formdata.append('gameImg', fileImg)
            willUpdateImg = true
        }

        const token = localStorage.getItem("token")
        let i = 0;
        let newGameId = null;
        while (i <= 1) {
            if (i === 1 && !willUpdateImg) break;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/game/create?newGameId=${newGameId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    ...(i === 0 && { 'Content-Type': 'application/json' })
                },
                body: i === 0 ? JSON.stringify({
                    name,
                    released: new Date(released).toJSON(),
                    price: parseFloat(price),
                    image,
                    file,
                    size,
                    intro,
                    os,
                    processor,
                    memory,
                    graphic,
                    directx,
                    storage,
                    tags,
                    developers,
                    publishers
                }) : formdata
            })
            i += 1;
            const data = await res.json()
            alert(data.message)
            newGameId = data.newGameId
            if (!data.success) break;
        }
        router.push(`/product_detail?id=${newGameId}`)
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header className={style.modal_head} closeButton>
                <Modal.Title>
                    <span >{name !== '' ? `Now editing: ${name}` : 'Create new game'}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={style.modal_body}>
                <Container>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Name:</b></Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Game's name" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Release date:</b></Form.Label>
                            <Form.Control
                                value={released ? moment(released).format('YYYY-MM-DD') : ''}
                                onChange={(e) => setReleased(e.target.value)}
                                type="date" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Price:</b></Form.Label>
                            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="00.00$" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>File&#39;s name:</b></Form.Label>
                            <Form.Control value={file} onChange={(e) => setFile(e.target.value)} type="text" placeholder="example.exe" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>File&#39;s size:</b></Form.Label>
                            <Form.Control value={size} onChange={(e) => setSize(e.target.value)} type="text" placeholder="GB,MB,..." />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label><b>Game&#39;s tags:</b></Form.Label>
                        <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} type="text" placeholder="Ex: Horror, 3D, Survival,..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label><b>Image file:</b></Form.Label>
                        <Row>
                            <Col>
                                <Image
                                    style={{ width: '100%', border: '1px double black' }}
                                    src={game && (!fileImg || fileImg?.type.search("image") === -1) ?
                                        image
                                        :
                                        (fileImg && fileImg?.type.search("image") > -1 ?
                                            URL.createObjectURL(fileImg) :
                                            "/noimg.png"
                                        )
                                    }
                                    alt={name}>
                                </Image>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="file"
                                    required
                                    name="gameImg"
                                    onChange={handleFileChange}
                                />
                                <div className="mt-1">
                                    {
                                        game ?
                                            <i>
                                                Game&#39;s image is available<br />You can select other if you want!
                                                <br />File&#39;s type can be png, jpg,...
                                            </i> :
                                            <i>
                                                Please select image for this game.
                                                <br />File&#39;s type can be png, jpg,...
                                            </i>
                                    }
                                    {fileImg?.type.search("image") > -1 ?
                                        '' :
                                        <h6 style={{
                                            marginTop: '10px',
                                            color: `${fileImg ? 'red' : ''}`
                                        }}>&nbsp;{fileImg && <span>⚠ Your file must be an image</span>}  </h6>
                                    }
                                </div>
                            </Col>
                        </Row>

                        {/* <p><i>No image found, please select one</i></p> */}



                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label><b>Introduction:</b></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={intro} onChange={(e) => setIntro(e.target.value)}
                            placeholder="Write down all infomation about your game here!"
                        />
                        <Form.Text className="text-muted">
                            {'(Max 10,0000 characters)'}
                        </Form.Text>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Developer:</b></Form.Label>
                            <Form.Control
                                value={developers} onChange={(e) => setDevelopers(e.target.value)}
                                type="text" placeholder="Ex: Capcom, Valve, (can be many)" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Publisher:</b></Form.Label>
                            <Form.Control
                                value={publishers} onChange={(e) => setPublishers(e.target.value)}
                                type="text" placeholder="Ex: Capcom, Valve, (can be many)" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>OS {'(Operating System)'}:</b></Form.Label>
                            <Form.Control
                                value={os} onChange={(e) => setOs(e.target.value)}
                                type="text" placeholder="Ex: Window 10 (64 bit)" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Processor:</b></Form.Label>
                            <Form.Control
                                value={processor} onChange={(e) => setProcessor(e.target.value)}
                                type="text" placeholder="Ex: Intel Core i7 8700,..." />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Memory:</b></Form.Label>
                            <Form.Control
                                value={memory} onChange={(e) => setMemory(e.target.value)}
                                type="text" placeholder="Ex: 16GB RAM" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Graphic:</b></Form.Label>
                            <Form.Control
                                value={graphic} onChange={(e) => setGraphic(e.target.value)}
                                type="text" placeholder="Ex: NVIDIA GeForce" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Directx:</b></Form.Label>
                            <Form.Control
                                value={directx} onChange={(e) => setDirectx(e.target.value)}
                                type="text" placeholder="Ex: Version 12" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="">
                            <Form.Label><b>Storage:</b></Form.Label>
                            <Form.Control
                                value={storage} onChange={(e) => setStorage(e.target.value)}
                                type="text" placeholder="Ex: 60 GB available space" />
                        </Form.Group>
                    </Row>

                    {game ?
                        <Button style={{ float: 'right', marginLeft: '5px' }} variant="success" onClick={() => handleUpdate(game.id)}>
                            Update
                        </Button>
                        :
                        <Button style={{ float: 'right', marginLeft: '5px' }} variant="success" onClick={() => handleCreate()}>
                            Create
                        </Button>
                    }

                    <Button style={{ float: 'right' }} variant="danger">
                        Cancel
                    </Button>

                </Container>
            </Modal.Body>
        </Modal >
    )
}