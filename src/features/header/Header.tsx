import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
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

    return (
        <>
        <div className="header">
            <span>LOGO</span>
            <span className='lg-btn' onClick={handleLogin}>Login</span>
        </div>
        <Modal
                title='Đăng nhập'
                visible={visible}
                confirmLoading={confirmLoading}
                className="login"
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
                <Input size="large" placeholder="large size" />
                <Input.Password size='large'
                    placeholder="input password" className='mgt-20'
                />
            </Modal>
        </>
    )
}

export default Header;