
import { Button, Input, Modal, Statistic } from 'antd';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createOneNoJwt } from '../../services/api';
import fakeRequest from '../../utils/fakeRequest';
import { statusNotification } from '../notification/Notification';
import { updateCandidate } from '../reducer/listCandidateSlice';
import './Header.css';
import GoogleButton from 'react-google-button';

const Header = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [visibleSubmit, setvisibleSubmit] = useState(false);
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData') || '')
            : null
    );

    const handleFailure = (result: any) => {
        statusNotification(false, "Đăng nhập thất bại");
        console.log(result)
        console.log(Object(process.env.REACT_APP_GOOGLE_CLIENT_ID))
    };

    const Login = async (googleData: any) => {
        // const res = await fetch('/api/google-login', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         token: googleData.tokenId,
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        // const data = await res.json();
        // setLoginData(data);
        // localStorage.setItem('loginData', JSON.stringify(data));
        const useInfo = {

        }
        console.log(googleData)
    };
    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    };

    const showModal = () => {
        setvisibleSubmit(true);
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
            } catch (error) {
                statusNotification(false, "Đăng nhập thất bại")

            } finally {
                setConfirmLoading(false);
                const token = localStorage.getItem('jwt');
                if (token != null) {
                    await fakeRequest(500)
                    statusNotification(true, "Đăng nhập thành công")
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
                    fakeRequest(1000)
                }
            } catch (err) {
                console.log(err);
            } finally {
                navigate("/completetest")
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
                            <Countdown value={props.time.current} />
                            <Button onClick={showModal} className='btn-sub mgl-20'>
                                {/* <Link to='/completetest'>Nộp bài</Link> */}
                                Nộp bài
                            </Button>
                        </span>
                        : <></>}
                    <Modal title="Xác nhận nộp bài" visible={visibleSubmit} onOk={handleSubmit} okText="Xác nhận" onCancel={cancelSubmit} cancelText="Hủy">
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

                            <Button key="submit" loading={confirmLoading} onClick={handleOk} className='btn-login'>
                                Đăng nhập
                            </Button>
                            <p></p>
                            <GoogleLogin

                                clientId={'744974257082-770efbi5v4ah0ic7qdg6rss3b7nsutuc.apps.googleusercontent.com'}
                                // render={renderProps => (
                                //     <GoogleButton onClick={Login} type="dark"></GoogleButton>
                                // )}
                                buttonText="Log in with Google"
                                onSuccess={Login}
                                onFailure={handleFailure}
                                cookiePolicy={'single_host_origin'}
                            ></GoogleLogin>

                        </div>
                    </div>
                    ,
                ]}
            >

                <Input size="large" placeholder="Enter username" onChange={enterUsername} />
                <Input.Password
                    placeholder="Enter password" className='mgt-20' onChange={enterPassword}
                />
                <p></p>

            </Modal>
        </>
    )
}


export default Header;