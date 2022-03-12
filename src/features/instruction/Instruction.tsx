import { Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Instruction.css';

const Instruction = () => {
    return (
        <div>
            <Header />
            <div className='fullscreen body'>
                <span className='big-text'>Hướng dẫn</span>
                <p>Nội dung hướng dẫn nằm đây ....</p>
                <Link to='/test'>
                    <Button className='begin'>Bắt đầu</Button>
                </Link>
            </div>
        </div>
    )
}

export default Instruction;