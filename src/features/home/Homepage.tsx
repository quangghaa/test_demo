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

const Homepage = () => {

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

    const [canCode, setCanCode] = useState('');

    const [urls, setUrls] = useState([] as string[]);

    useEffect(() => {
        let us = [];
        
        const canUrl = canCode.length > 0 ? 'https://demo.uiza.vn/candidates?code=' + canCode : '';
        const ltUrl = canCode.length > 0 ? 'https://demo.uiza.vn/tests/?_where[_or][0][candidates.code_contains]='+ canCode : '';

        if(canUrl.length > 0 && ltUrl.length > 0) {
            us.push(canUrl);
            us.push(ltUrl);
        }
        setUrls(us);
    }, [canCode])

    const enterCode = (e: any) => {
        setCanCode(e.target.value);
    }

    const handleClick = () => {
        // const urls = [
        //     'https://demo.uiza.vn/candidates?code=BC1',
        //     'https://demo.uiza.vn/tests?_where[_or][0][candidates.code_contains]=BC1'
        // ];

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)  // check the response of our APIs
                .then(parseJSON)    // parse it to Json
                .catch(error => {
                    console.log('There was a problem!', error);
                })
        ))
            .then(data => {
                // assign to requested URL as define in array with array index.
                const can = data[0];
                const test = data[1];
                if(Array.isArray(can) && can.length > 0) {
                    can.map(c => {
                        dispatch(addCandidate(c));
                    })
                }
                if(Array.isArray(test) && test.length > 0) {
                    test.map(t => {
                        dispatch(addTest(t));
                    })
                }
            })

        // const fetchData = async () => {
        //     const urls = [
        //         'https://demo.uiza.vn/candidates?code=BC1',
        //         'https://demo.uiza.vn/tests?_where[_or][0][candidates.code_contains]=BC1'
        //     ];
        //     try {
        //         await Promise.all(urls.map(url => {
        //             fetch(url)
        //             .then(checkStatus)
        //             .then(parseJSON)
        //             .catch(err => console.log('There was a problem! ', err));
        //         }))
        //         .then(data => {
        //             // assign to requested URL as define in array with array index.
        //             const can = data[0];
        //             const test = data[1];
        //             console.log("Can: ", can);
        //             console.log("Test: ", test);
        //             setCanRes(can as any);
        //             setTestRes(test as any);
        //         })
        //     } catch(error) {
        //         console.log(error);
        //     }

        // }
        // fetchData();

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
                    <Input placeholder="Basic usage" onChange={enterCode} className='no-border' />
                    <Link to='/instruction'>
                        <span className='position' onClick={handleClick}><LoginOutlined /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage;