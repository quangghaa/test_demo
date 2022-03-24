import { Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Instruction.css';

const Instruction = (props: any) => {
    
    return (
        <div>
            <Header start={props.start}/>
            <div className='fullscreen body'>
                <span className='big-text'>Hướng dẫn</span>
                <p>Nội dung hướng dẫn nằm đây ....</p>
                    <Button className='begin' onClick={props.begin}>
                        <Link to='/test'>Bắt đầu</Link>
                    </Button>
                
            </div>
        </div>
    )
}

export default Instruction;