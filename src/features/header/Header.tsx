import { Button, Input, Modal, Statistic } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createOneNoJwt } from '../../services/api';
import { updateCandidate } from '../reducer/listCandidateSlice';
import './Header.css';

const Header = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleLogin = () => {
        setVisible(true);

    }


    const handleOk = () => {
        const loadPost = async () => {

            try {
                setConfirmLoading(true);
                // Await make wait until that 
                // promise settles and return its result
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}authenticate`, user);

                // After fetching data stored it in posts state.
                console.log("RES: ", response.data);
                localStorage.setItem("jwt", response.data.jwt);
                setVisible(false);

            } finally {
                setConfirmLoading(false);
                const token = localStorage.getItem('jwt');
                if (token != null) {
                    navigate('/dashboard');
                }
                else {
                    setVisible(true);
                }
            }
        }

        // Call the function
        loadPost();


        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setVisible(false);
        //     setConfirmLoading(false);
        //     navigate('/dashboard');
        // }, 2000);
    };

    const enterUsername = (e: any) => {
        const u = e.target.value.trim();
        setUser({ ...user, username: u });
    }

    const enterPassword = (e: any) => {
        const p = e.target.value.trim();
        setUser({ ...user, password: p });
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const { Countdown } = Statistic;
    // const deadline = Date.now() + 1000 * 60 * 60; // Moment is also OK
    const timeTest = useRef(Date.now() + 1000 * 60 * 60);

    const onFinish = async () => {
        try {
            const res = await createOneNoJwt('testpage/submit');
            if (res) {
                console.log("ket qua: ", res.data);
                const marks = {
                    englishMark: res.data.data.englishMark != null ? parseInt(res.data.data.englishMark) : -1,
                    codingMark: res.data.data.codingMark != null ? parseInt(res.data.data.codingMark) : -1,
                    knowledgeMark: res.data.data.knowledgeMark != null ? parseInt(res.data.data.knowledgeMark) : -1
                }

                console.log("MARKS: ", marks);
                dispatch(updateCandidate(marks));
                navigate("/completetest")
            }
        } catch (err) {
            console.log(err);
        }

    }

    function onChange(val: any) {
        if (4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    }

    const handleSubmit = () => {
        const submit = async () => {
            try {
                const res = await createOneNoJwt('testpage/submit');
                if (res) {
                    console.log("ket qua: ", res.data);
                    const marks = {
                        englishMark: res.data.data.englishMark != null ? parseInt(res.data.data.englishMark) : -1,
                        codingMark: res.data.data.codingMark != null ? parseInt(res.data.data.codingMark) : -1,
                        knowledgeMark: res.data.data.knowledgeMark != null ? parseInt(res.data.data.knowledgeMark) : -1
                    }

                    console.log("MARKS: ", marks);

                    dispatch(updateCandidate(marks));

                }
            } catch (err) {
                console.log(err);
            }
        }

        submit();

        props.finish();
    }

    return (
        <>
            <div className="header">

                <span className='row-between fullwidth'>
                    <span>LOGO</span>
                    {props.start ?
                        <span className='row mgl-20'>
                            <Countdown value={timeTest.current} onFinish={onFinish} />
                            <Button onClick={handleSubmit} className='btn-sub mgl-20'>
                                <Link to='/completetest'>Nộp bài</Link>

                            </Button>
                        </span>
                        : <></>}

                </span>
                {props.start ? <></> : <span className='lg-btn' onClick={handleLogin}>Login</span>}

            </div>
            <Modal
                title='Đăng nhập'
                visible={visible}
                confirmLoading={confirmLoading}
                className="login"
                onCancel={handleCancel}
                footer={[
                    <div className='col'>
                        <div className='row-reverse'><span className='forgot-pass'>Quên mật khẩu?</span></div>
                        <div className='center'>
                            {/* <Link to='/dashboard'> */}
                            <Button key="submit" loading={confirmLoading} onClick={handleOk} className='btn-login'>
                                Đăng nhập
                            </Button>
                            {/* </Link> */}
                        </div>
                    </div>
                    ,
                ]}
            >
                <Input size="large" placeholder="Enter username" onChange={enterUsername} />
                <Input.Password
                    placeholder="Enter password" className='mgt-20' onChange={enterPassword}
                />
            </Modal>
        </>
    )
}

export default Header;