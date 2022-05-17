import { LoginOutlined } from '@ant-design/icons';
import { Divider, Input } from 'antd';
import { url } from 'inspector';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Header from '../header/Header';
import { ICandidate, ITest } from '../interface';
import { selectCandidate } from '../reducer/listCandidateSlice';
import { addTest, selectListTest } from '../reducer/listTestSlice';
import { addCandidate } from '../reducer/listCandidateSlice';
import './Homepage.css';
import { useNavigate } from "react-router-dom";
import { getListNoJwt } from '../../services/api';

const Homepage = (props: any) => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [canId, setCanId] = useState('');

    const [loading, setLoading] = useState(false);

    const enterCanId = (e: any) => {
        const id = e.target.value;
        setCanId(id.trim());
    }

    const handleClick = () => {
        const joinTest = async () => {
            try {
                setLoading(true);
                const res = await getListNoJwt('jointest', {code: canId});
                console.log(res.data)
                if(res) {
                    dispatch(addCandidate(res.data));
                    navigate('/instruction');
                }
            } finally {
                setLoading(false);
            }
            
        }

        joinTest();
    }

    return (
        <div>
            <Header start={props.start} />
            <div className='fullscreen body'>
                <span className='big-text'>Chào mừng bạn đến với</span>
                <br></br>
                <div className='img-box'>
                    <img src="./images/logo.png" alt="NO IMAGE FOUND" />
                </div>
                <span className='hint'>Nhập code của bạn để làm bài test</span>
                <br></br>
                <div className='input-box'>
                    <Input placeholder="Basic usage" onChange={enterCanId} className='no-border' />
                    {/* <Link to='/instruction'> */}
                    <span className='position' onClick={handleClick}><LoginOutlined /></span>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Homepage;