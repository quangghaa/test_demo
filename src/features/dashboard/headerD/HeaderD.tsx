import { HolderOutlined, MenuOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { clear } from '../../reducer/testSlice';
import './HeaderD.css';

const HeaderD = () => {
    const dispatch = useAppDispatch();

    const clearState = () => {
        dispatch(clear());
    }

    const logout = () => {
        dispatch(clear());
        localStorage.removeItem('jwt');
        console.log('Cleared and OUT');
    }

    const [popup, setPopup] = useState(false);
    

    return (
        <div>
            <Row className='headerD'>
                <Col span={6}>
                    <span className='mgr-20'><MenuOutlined /></span>
                    <span> LOGO </span>
                </Col>

                <Col span={12}>
                    <ul className='nav-header'>
                        
                        <li onClick={clearState}>
                            <Link to='/dashboard/schedule'>Lịch test</Link>
                        </li>
                        <li onClick={clearState}>
                            <Link to='/dashboard/question'>Bộ câu hỏi</Link>
                        </li>
                        <li onClick={clearState}>
                            <Link to='/dashboard/complete'>Đã hoàn thành</Link>
                        </li>
                        <li>Tài liệu</li>
                    </ul>
                </Col>

                <Col span = {6} className='row-reverse'>
                    <span className='logout-ic' onClick={logout}>
                        <Link to='/'><UserSwitchOutlined /></Link>
                    </span>
                    <span className='mgr-20'><HolderOutlined /></span>
                </Col>
            </Row>
        </div>
    )
}

export default HeaderD;