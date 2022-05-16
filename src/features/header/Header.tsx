import { Button, Input, Modal, Statistic } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createOneNoJwt } from '../../services/api';
import fakeRequest from '../../utils/fakeRequest';
import { statusNotification } from '../notification/Notification';
import { selectCandidate, updateCandidate } from '../reducer/listCandidateSlice';
import './Header.css';

const Header = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [visibleSubmit, setvisibleSubmit] = useState(false);

    const showModal = () => {
        setvisibleSubmit(true);
    };

    const okSubmit = () => {
        handleSubmit()
        setvisibleSubmit(false);
        navigate("/completetest")
    };

    const cancelSubmit = () => {
        setvisibleSubmit(false);
    };

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
                console.log("RES: ", response);
                localStorage.setItem("jwt", response.data.jwt);
                setVisible(false);

            } finally {
                setConfirmLoading(false);
                const token = localStorage.getItem('jwt');
                if (token != null) {
                    await fakeRequest(500)
                    statusNotification(true)
                    navigate('/dashboard');
                }
                else {
                    setVisible(true);
                    statusNotification(false)
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

    const listTest = useAppSelector(selectCandidate);

    const convertTime = (value: any) => {
        console.log(value)
        if (value == null) {
            return Date.now()
        }
        const splitString = value.split(":")
        console.log(splitString)
        const splitTime = (+splitString[0] * 60 * 60 * 10) + (+splitString[1] * 60 * 10) + splitString[2]
        const timeTest = Date.now() + parseInt(splitTime)
        return timeTest

    }

    const timeTest = listTest.length != 0 ? convertTime(listTest[0].times) : Date.now()

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
                            <Countdown value={timeTest} onFinish={onFinish} />
                            <Button onClick={showModal} className='btn-sub mgl-20'>
                                {/* <Link to='/completetest'>Nộp bài</Link> */}
                                Nộp bài
                            </Button>
                        </span>
                        : <></>}
                    <Modal title="Xác nhận nộp bài" visible={visibleSubmit} onOk={okSubmit} okText="Xác nhận" onCancel={cancelSubmit} cancelText="Hủy">
                        <p>Xác nhận nộp bài , nếu bạn nộp bài thì không thể quay lại trang </p>

                    </Modal>
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