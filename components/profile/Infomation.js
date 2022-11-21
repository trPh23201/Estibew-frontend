import moment from 'moment'
import { useState } from "react";
import { Form, Stack, InputGroup, Col, FormControl, Row, Button, Container, Image, Modal, FloatingLabel } from "react-bootstrap";
import { BsBoxArrowUpRight, BsBrushFill, BsFacebook, BsSave, BsXLg } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import styles from '../../styles/Infomation.module.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Infomation({ user, setUser, viewMode }) {
    const [username, setUserName] = useState(user.username)
    const [phone, setPhone] = useState(user.phone)
    const [gender, setGender] = useState(user.gender)
    const [birthday, setBirthday] = useState(user.birthday)
    const [country, setCountry] = useState(user.country)
    const [city, setCity] = useState(user.city)
    const [interests, setInterests] = useState(user.interests)
    const [bio, setBio] = useState(user.bio)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [disabledName, setDName] = useState(true)
    const [disabledPhone, setDPhone] = useState(true)
    const [disabledGender, setDGender] = useState(true)
    const [disabledBirthday, setDBirthday] = useState(true)
    const [disabledCountry, setDCountry] = useState(true)
    const [disabledCity, setDCity] = useState(true)
    const [disabledInterests, setDInterests] = useState(true)
    const [disableBio, setDBio] = useState(true)
    //Update IMG modal
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const handleClose = () => {
        setFile(null)
        setShow(false)
    }
    const handleShow = () => {
        viewMode === false && setShow(true)
    };

    async function handleSave(params, value) {
        const formdata = new FormData()
        file && formdata.append('avatar', file)

        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/${user.id}/update`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...(!file && { 'Content-Type': 'application/json' })
            },
            body: file ? formdata : JSON.stringify({
                [params]: value
            })
        })
        const data = await res.json()
        alert(data.message)
        if (data.success) {
            if (params === 'username') {
                setUser({ ...user, username: username })
                setDName(true)
            } else if (params === 'phone') {
                setUser({ ...user, phone: phone })
                setDPhone(true)
            } else if (params === 'gender') {
                setUser({ ...user, gender: gender })
                setDGender(true)
            } else if (params === 'birthday') {
                setUser({ ...user, birthday: birthday })
                setDBirthday(true)
            } else if (params === 'avatar') {
                setUser({ ...user, avatar: URL.createObjectURL(file) })
                handleClose()
            } else if (params === 'country') {
                setUser({ ...user, country: country })
                setDCountry(true)
            } else if (params === 'city') {
                setUser({ ...user, city: city })
                setDCity(true)
            } else if (params === 'interests') {
                setUser({ ...user, interests: interests })
                setDInterests(true)
            } else if (params === 'bio') {
                setUser({ ...user, bio: bio })
                setDBio(true)
            }
        }
    }

    async function handleSetting(type) {
        const isHide = user.privacy[0][type]
        setUser({ ...user, privacy: [{ ...user.privacy[0], [type]: !isHide }] })

        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/privacy/${user.privacy[0].id}/update`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [type]: !isHide
            })
        })
        const data = await res.json()
        if (!data.success) {
            alert(data.message)
        }
    }

    async function handleUpdatePassword() {
        const token = localStorage.getItem('token')
        if (password !== confirm) alert("Password and confirm password doesn't match")
        else if (password.length < 6) alert("Password must be atleast 6 characters or above")
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/update_password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Old-to-new': 'update my password'
                },
                body: JSON.stringify({ password, confirm, oldPassword })
            })
            const data = await res.json()
            alert(data.message)
        }
    }

    function handleCancel(name) {
        if (name === 'name') {
            setUserName(user.username)
            setDName(true)
        } else if (name === 'phone') {
            setPhone(user.phone)
            setDPhone(true)
        } else if (name === 'gender') {
            setGender(user.gender)
            setDGender(true)
        } else if (name === 'birthday') {
            setBirthday(user.birthday)
            setDBirthday(true)
        } else if (name === 'country') {
            setCountry(user.country)
            setDCountry(true)
        } else if (name === 'city') {
            setCity(user.city)
            setDCity(true)
        } else if (name === 'interests') {
            setInterests(user.interests)
            setDInterests(true)
        } else if (name === 'bio') {
            setBio(user.bio)
            setDBio(true)
        }
    }

    function renderAgo(jsonDate) {
        if (!jsonDate) return 'none'
        const past = new Date(jsonDate).getTime();
        const now = new Date().getTime();
        const seccond = 1000;
        const minute = seccond * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const week = day * 7;
        const seccondAgo = Math.floor((now - past) / seccond);
        const minuteAgo = Math.floor((now - past) / minute);
        const hourAgo = Math.floor((now - past) / hour);
        const dayAgo = Math.floor((now - past) / day);
        const weekAgo = Math.floor((now - past) / week);

        if (seccondAgo < 10) return `Just now`
        else if (seccondAgo < 60) return `${seccondAgo} sec ago`
        else if (minuteAgo < 60) return `${minuteAgo}m ago`
        else if (hourAgo < 24) return `${hourAgo}h ago`
        else if (dayAgo < 7) return `${dayAgo}d ago`
        else return `${weekAgo} week${weekAgo > 1 ? 's' : ''}`
    }

    function renderLoginVia() {
        if (user.provider === 'facebook')
            return (
                <span
                    style={{
                        backgroundColor: '#2374E1',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        userSelect: 'none'
                    }}
                    variant="success">
                    <BsFacebook />&nbsp;Facebook
                </span>
            )
        else if (user.provider === 'google') {
            return (
                <span
                    style={{
                        backgroundColor: '#fff',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2px 6px',
                        borderRadius: '2px',
                        userSelect: 'none'
                    }}
                    variant="dark">
                    <FcGoogle />&nbsp;Google
                </span>
            )
        } else {
            return (
                <span style={{
                    backgroundColor: 'rgb(16 68 120)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px 6px',
                    borderRadius: '2px',
                    userSelect: 'none'
                }}>
                    <Image
                        alt=""
                        src="/logo.png"
                        height="24"
                        className="d-inline-block align-top"
                    />{' '}
                    Estibew
                </span>
            )
        }
    }

    function renderMyAction() {
        return (
            <>
                <h2 style={{ marginTop: '60px' }}>Public Profile</h2>
                <Form.Check
                    checked={user.privacy[0].profile ? false : true}
                    className={styles.switchProfile}
                    type="switch"
                    id="custom-switch"
                    label="Allow everyone view your profile."
                    onChange={() => handleSetting('profile')}
                />
                <h2 style={{ marginTop: '40px' }}>Private Info</h2>
                <Form.Check
                    checked={user.privacy[0].info ? true : false}
                    className={styles.switchProfile}
                    type="switch"
                    id="custom-switch"
                    label="Just hide your main info like email, phone."
                    onChange={() => handleSetting('info')}
                />
                {user.provider === null &&
                    <>
                        <h2 style={{ marginTop: '68px', marginBottom: '20px' }}>Change password</h2>

                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="Current password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" placeholder="Confirm new password" />
                        </Form.Group>
                        <div><Button style={{ float: 'right' }} onClick={handleUpdatePassword}>Save changes</Button></div>
                    </>
                }
            </>
        )
    }

    function renderInfo() {
        return (
            <Stack>
                <Form>
                    <h2 className='mb-4'>Account Info</h2>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column lg={2}>
                            Email
                        </Form.Label>
                        <Col lg={10}>
                            <FormControl disabled type="email" placeholder="Email" value={user.email || ''} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column lg={2}>
                            Name
                        </Form.Label>
                        <Col lg={10}>
                            <InputGroup>
                                <FormControl
                                    placeholder="Please enter your name"
                                    value={username || ''}
                                    disabled={disabledName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                {disabledName ?
                                    viewMode ? '' : <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => setDName(false)} ><BsBrushFill /></InputGroup.Text> :
                                    <>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleSave('username', username)}><BsSave /></InputGroup.Text>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleCancel('name')}  ><BsXLg /></InputGroup.Text>
                                    </>
                                }
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column lg={2}>
                            Phone
                        </Form.Label>
                        <Col className={`${styles.phone_input} ${disabledPhone ? styles.disable : styles.enable}`}>
                            <PhoneInput
                                country={'vn'}
                                value={phone || ''}
                                disabled={disabledPhone}
                                onChange={(phone) => setPhone(phone)}
                            />
                            {disabledPhone ?
                                viewMode ? '' : <Button variant='secondary' onClick={() => setDPhone(false)} size="sm"><BsBrushFill /></Button> :
                                <>
                                    <Button variant='secondary' size="sm" onClick={() => handleSave('phone', phone)}><BsSave /></Button>
                                    <Button variant='secondary' size="sm" onClick={() => handleCancel('phone')}><BsXLg /></Button>
                                </>
                            }
                        </Col>
                    </Form.Group>
                    <div className={styles.h}></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '16px', lineHeight: '18px' }}>Login via:</span> &ensp;
                        {renderLoginVia()}
                    </div>
                    <div className='mt-3'>Joined since: {moment(user.created).format("DD MMM, YYYY")}</div>
                    <h2 style={{ marginTop: '60px' }}>Profile Details</h2>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs={2} sm={2} md={2} lg={2}>
                            Gender:
                        </Form.Label>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            {disabledGender ?
                                <>
                                    <Form.Label column>
                                        {!gender ? 'Unknown ❔' :
                                            (gender == 'male' ? 'Male 🙎‍♂️' : 'Female 🙎')
                                        } &nbsp;
                                        {viewMode ? '' : <BsBoxArrowUpRight onClick={() => setDGender(false)} style={{ cursor: 'pointer', fontSize: '20px' }} />}
                                    </Form.Label>
                                </> :
                                <>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        name="gg"
                                        id="formHorizontalRadios1"
                                        onClick={() => setGender('male')}
                                        checked={gender == 'male' && true}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        name="gg"
                                        id="formHorizontalRadios2"
                                        onClick={() => setGender('female')}
                                        checked={gender == 'female' && true}
                                    />
                                    <Button size="sm" variant="success" onClick={() => handleSave('gender', gender)} >Save</Button>&emsp;
                                    <Button size="sm" variant="danger" onClick={() => handleCancel('gender')}>Cancel</Button>
                                </>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column xs={2} sm={2} md={2} lg={2}>
                            Birthday:
                        </Form.Label>
                        <Col xs={10} sm={10} md={10} lg={10}>
                            <InputGroup>
                                <FormControl
                                    value={birthday ? moment(birthday).format('YYYY-MM-DD') : ''}
                                    disabled={disabledBirthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    type="date"
                                />
                                {disabledBirthday ?
                                    viewMode ? '' : <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => setDBirthday(false)} ><BsBrushFill /></InputGroup.Text> :
                                    <>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleSave('birthday', birthday)}><BsSave /></InputGroup.Text>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleCancel('birthday')}  ><BsXLg /></InputGroup.Text>
                                    </>
                                }
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <InputGroup>
                                <FormControl
                                    value={country || ''}
                                    disabled={disabledCountry}
                                    placeholder="Country"
                                    onChange={(e) => setCountry(e.target.value)} />
                                {disabledCountry ?
                                    viewMode ? '' : <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => setDCountry(false)} ><BsBrushFill /></InputGroup.Text> :
                                    <>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleSave('country', country)}><BsSave /></InputGroup.Text>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleCancel('country')}  ><BsXLg /></InputGroup.Text>
                                    </>
                                }
                            </InputGroup>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <InputGroup>
                                <FormControl
                                    value={city || ''}
                                    disabled={disabledCity}
                                    placeholder="City"
                                    onChange={(e) => setCity(e.target.value)} />
                                {disabledCity ?
                                    viewMode ? '' : <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => setDCity(false)} ><BsBrushFill /></InputGroup.Text> :
                                    <>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleSave('city', city)}><BsSave /></InputGroup.Text>
                                        <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleCancel('city')}  ><BsXLg /></InputGroup.Text>
                                    </>
                                }
                            </InputGroup>
                        </Col>
                        <Col className='mt-3' xs={12} sm={12} md={12} lg={12}>
                            <Form.Group className="position-relative">
                                <FormControl
                                    as="textarea"
                                    placeholder="Bio"
                                    rows={4}
                                    disabled={disableBio}
                                    value={bio || ''}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                                <Form.Text style={{ color: '#d9d9d9' }}>
                                    Max 1000 characters.
                                </Form.Text>
                                {disableBio ?
                                    <Button variant='warning' className={`${styles.bio_btn} ${styles.bio_btn_open}`} onClick={() => setDBio(false)}>
                                        <BsBrushFill />
                                    </Button> :
                                    <>
                                        <Button variant='warning' className={`${styles.bio_btn} ${styles.bio_btn_action}`} onClick={() => handleSave('bio', bio)}>
                                            <BsSave />
                                        </Button>
                                        <Button variant='warning' className={`${styles.bio_btn} ${styles.bio_btn_action}`} onClick={() => handleCancel('bio')}>
                                            <BsXLg />
                                        </Button>
                                    </>
                                }
                            </Form.Group>
                        </Col>
                        <Col className='mt-3' xs={12} sm={12} md={12} lg={12}>
                            <Form.Group>
                                <InputGroup>
                                    <FormControl
                                        value={interests || ''}
                                        disabled={disabledInterests}
                                        placeholder="Interests"
                                        onChange={(e) => setInterests(e.target.value)} />
                                    {disabledInterests ?
                                        viewMode ? '' : <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => setDInterests(false)} ><BsBrushFill /></InputGroup.Text> :
                                        <>
                                            <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleSave('interests', interests)}><BsSave /></InputGroup.Text>
                                            <InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => handleCancel('interests')}  ><BsXLg /></InputGroup.Text>
                                        </>
                                    }
                                </InputGroup>
                                <Form.Text style={{ color: '#d9d9d9' }}>
                                    Genre you are passionate about or would like to explore.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    {viewMode || renderMyAction()}
                </Form>
            </Stack>
        )
    }

    return (
        <Container>
            <Row className={styles.row}>
                <Col xs={12} sm={12} md={12} lg={9}>
                    {renderInfo()}
                </Col>
                <Col xs={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} lg={{ span: 3, offset: 0 }}>
                    <Image className={
                        viewMode ? styles.avatar_view : styles.avatar
                    } alt={username} src={user.avatar || '/user.png'} onClick={handleShow} />
                    <h6 style={{
                        textAlign: 'center',
                        margin: '5px 0px'
                    }}>
                        {user.username}
                    </h6>
                    <p style={{
                        textAlign: 'center',
                        color: '#90ff90',
                        margin: '5px 0px'
                    }}>
                        Last active: {viewMode ? renderAgo(user.lastActivedAt) : 'Just now'}
                    </p>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} fullscreen={'md-down'}>
                <Modal.Header closeButton>
                    <Modal.Title>Update avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="file"
                        required
                        name="avatar"
                        onChange={handleFileChange}
                    />
                    {file && file.type.search("image") > -1 ?
                        <>
                            <h4 style={{ marginTop: '10px' }}>Your new avatar:</h4>
                            <Image style={{
                                width: '100%',
                                paddingLeft: '25%',
                                paddingRight: '25%',
                                objectFit: 'cover'
                            }} src={URL.createObjectURL(file)} alt="UploadImage" />
                        </> :
                        <h5 style={{
                            marginTop: '10px',
                            color: `${file ? 'red' : ''}`
                        }}>&nbsp;{file ? "⚠ Your file must be an image" : "Please choose your image"}</h5>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={file && file.type.search("image") > -1 ? false : true}
                        variant="primary" onClick={() => handleSave('avatar', file)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}