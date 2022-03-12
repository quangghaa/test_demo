import { LoginOutlined } from '@ant-design/icons';
import { Divider, Input } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Homepage.css';

const Homepage = () => {
    const handleClick = () => {
        console.log("Direct");
    }

    return (
        <div>
            <Header />
            <div className='fullscreen body'>
                <span className='big-text'>Chào mừng bạn đến với</span>
                <br></br>
                <div className='img-box'>
                    IMAGE
                </div>
                <span className='hint'>Nhập code của bạn để làm bài test</span>
                <br></br>
                <div className='input-box'>
                    <Input placeholder="Basic usage" className='no-border' />
                    <Link to='/instruction'>
                        <span className='position' onClick={handleClick}><LoginOutlined /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage;