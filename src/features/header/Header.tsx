import { Button, Input, Modal, Statistic } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props: any) => {
    const handleLogin = () => {
        console.log('Login');
        setVisible(true);
    }

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const { Countdown } = Statistic;
    // const deadline = Date.now() + 1000 * 60 * 60; // Moment is also OK
    const dl = useRef(Date.now() + 1000 * 60 * 60);
    

    function onFinish() {
        console.log('finished!');
    }

    function onChange(val: any) {
        if (4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    }

    const handleSubmit = () => {
        console.log('...');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
        const fetchData = async () => {
            try {
                const doUrl = `${process.env.REACT_APP_BASE_URL}testpage/submit`;
                const res = await fetch(doUrl, requestOptions);
                const json = await res.json();
                console.log("Nop bai OKE. ", json);
            } catch (error: any) {
                console.log(error);
            }
        }
        fetchData();

        props.finish();
    }

    return (
        <>
            <div className="header">
                
                <span className='row-between fullwidth'>
                    <span>LOGO</span>
                    {props.start ?  
                    <span className='row mgl-20'>
                        <Countdown value={dl.current} onFinish={onFinish} />
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
                            <Link to='/dashboard'>
                                <Button key="submit" loading={confirmLoading} onClick={handleOk} className='btn-login'>
                                    Đăng nhập
                                </Button>
                            </Link>
                        </div>
                    </div>
                    ,
                ]}
            >
                <Input size="large" placeholder="Enter username" />
                <Input.Password size='large'
                    placeholder="Enter password" className='mgt-20'
                />
            </Modal>
        </>
    )
}

export default Header;