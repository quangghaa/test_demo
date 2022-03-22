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

    const navigate = useNavigate();

    const handleClick = () => {
        // Promise.all(urls.map(url =>
        //     fetch(url)
        //         .then(checkStatus)  // check the response of our APIs
        //         .then(parseJSON)    // parse it to Json
        //         .catch(error => {
        //             console.log('There was a problem!', error);
        //         })
        // ))
        //     .then(data => {
        //         // assign to requested URL as define in array with array index.
        //         const can = data[0];
        //         const test = data[1];

        //         console.log("Candidate: ", can);
        //         console.log("Exam: ", test);
        //         if(can !== null || can !== undefined ) {
        //             dispatch(addCandidate(can));
                    
        //         }
        //         if(Array.isArray(test) && test.length > 0) {
        //             test.map(t => {
        //                 dispatch(addTest(t));
        //             })
        //         }
        //     })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
        // const fetchData = async () => {
        //     try {
        //         const res = await fetch(joinUrl, requestOptions);
        //         if(res.ok) {
        //             console.log("OKEE");
        //             props.join('OKE');
        //             setTimeout(() => {
        //                 navigate('/instruction');
        //             }, 500);
        //             navigate('/instruction');
        //         }
        //         const json = await res.json();
        //         return res;
                
        //     } catch (error: any) {
        //     }
        // }
        // fetchData().then(res => {
        //     console.log("RESPONSE: ", res?.json());
        //     // props.join(res);
        // });
        const fetchData = () => {
            const a = fetch(joinUrl, requestOptions).then(res => res.ok)
        
            a.then(accountInfo => {
                // We can now store account info state on this component
                return fetch('http://localhost:8080/testpage/alltest');
            })
            .then(res => res.json())
            .then(transactions => {
                // Here we can use our transaction data
                console.log(transactions);
            })
            .catch(reqErr => console.error(reqErr))
            
        }
        fetchData();
    }

    return (
        <div>
            <Header start={props.start}/>
            <div className='fullscreen body'>
                <span className='big-text'>Chào mừng bạn đến với</span>
                <br></br>
                <div className='img-box'>
                    IMAGE
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