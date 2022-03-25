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

const Homepage = (props: any) => {

    function checkStatus(response: any) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    function parseJSON(response: any) {
        return response.json();
    }

    const dispatch = useAppDispatch();
    const canState = useAppSelector(selectCandidate);
    const ltState = useAppSelector(selectListTest);

    const [canId, setCanId] = useState('');

    const [urls, setUrls] = useState([] as string[]);

    const [joinUrl, setJoinUrl] = useState('');

    useEffect(() => {
        const url = canId.length > 0 ? 'http://localhost:8080/jointest?code=' + canId : '';
        setJoinUrl(url);
    }, [canId])

    const enterCanId = (e: any) => {
        setCanId(e.target.value);
    }

    const [listTest, setListTest] = useState(null);

    const navigate = useNavigate();

    const handleClick = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        const fetchData = async () => {
            try {
                const res = await fetch(joinUrl, requestOptions);
                const json = await res.json();
                console.log("In fetch");
                dispatch(addCandidate(json));
                navigate('/instruction');

                return json;

            } catch (error: any) {
            }
        }
        fetchData();
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