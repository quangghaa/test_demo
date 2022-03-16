import { HolderOutlined, MenuOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './HeaderD.css';

const HeaderD = () => {
    return (
        <div>
            <Row className='headerD'>
                <Col span={6}>
                    <span className='mgr-20'><MenuOutlined /></span>
                    <span> LOGO </span>
                </Col>

                <Col span={12}>
                    <ul className='nav-header'>
                        
                        <li>
                            <Link to='/dashboard/schedule'>Lịch test</Link>
                        </li>
                        <li>
                            <Link to='/dashboard/question'>Bộ câu hỏi</Link>
                        </li>
                        <li>
                            <Link to='/dashboard/complete'>Đã hoàn thành</Link>
                        </li>
                        <li>Tài liệu</li>
                    </ul>
                </Col>

                <Col span = {6} className='row-reverse'>
                    <span><UserSwitchOutlined /></span>
                    <span className='mgr-20'><HolderOutlined /></span>
                </Col>
            </Row>
        </div>
    )
}

export default HeaderD;