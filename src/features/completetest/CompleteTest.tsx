import { Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './CompleteTest.css';

const CompleteTest = (props: any) => {

    return (
        <div>
            <Header start={props.start}/>
            <div className='fullscreen body'>
                <span className='big-text'>Bài test kết thúc</span>
                <p>Cảm ơn bạn đã dành thời gian</p>
                    <Button className='begin'>
                        <Link to='/'>Quay về</Link>
                    </Button>
                
            </div>
        </div>
    )
}

export default CompleteTest;