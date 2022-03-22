import { Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './Instruction.css';

const Instruction = (props: any) => {
    console.log(props.join);
    // const [loop, setLoop] = useState('');

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const fetchData = async () => {
            try {
                const url = 'http://localhost:8080/testpage/alltest';
                const res = await fetch(url, requestOptions);
                if(res.ok) {
                    // setLoop(await res.json());
                } else {
                    // setLoop('not oke');
                }
                const json = await res.json();
                return res;
            } catch (error: any) {
            }
        }
        fetchData().then(value => {
            console.log(value);
        });
    }, [props.join])

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