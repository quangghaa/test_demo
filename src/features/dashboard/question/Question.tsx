import { CheckSquareFilled, CloseCircleFilled, CloseOutlined, ConsoleSqlOutlined, DownOutlined, FieldTimeOutlined, FilterFilled, PlusOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useFetch from '../../../hook/useFetch';
import { ICandidate, ITest, QA, QData } from '../../interface';
import { addCandidate, selectTest, updateCandidates, updateCode, updateId, updateLevel, updateName, updateQas, updateType } from '../../reducer/testSlice';
import HeaderD from '../headerD/HeaderD';
import './Question.css';

const qsData = [
    {
        type: 'ENG',
        code: '0001',
        title: 'Test -1',
        level: 'B1',
        qa: [
            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },
        ]
    },
    {
        type: 'ENG',
        code: '0002',
        title: 'Test -2',
        level: 'B2',
        qa: [
            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },
        ]
    },
    {
        type: 'ENG',
        code: '0003',
        title: 'Test -3',
        level: 'B1',
        qa: [
            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },
        ]
    },
    {
        type: 'GEN',
        code: '0004',
        title: 'Test -4',
        level: 'Fresher',
        qa: [
            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },
        ]
    },
    {
        type: 'GEN',
        code: '0005',
        title: 'Test -5',
        level: 'Junior',
        qa: [
            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },

            {
                question: 'Anyuy _____ drink milk every day. She is very ...',
                choose: [
                    'A.',
                    'B.',
                    'C.',
                    'D.'
                ],
                answer: 'A',
            },
        ]
    }

]

const Question = (props: any) => {
    

    const options = [
        {
            value: 'ENG',
            label: 'Tiếng anh',
            children: [
            ],
        },
        {
            value: 'GEN',
            label: 'Kiến thức chung',
            children: [
            ],
        },
    ];

    const [testType, setTestType] = useState('');

    const [testname, setTestname] = useState('');

    const [level, setLevel] = useState('');

    const [isSearching, setIsSearching] = useState(false);
    const [rsSearch, setRsSearch] = useState([] as ITest[]);

    const enterTestname = (e: any) => {
        console.log(e.target.value);
        setTestname(e.target.value);
    }

    const engLevelList = ['B1', 'B2', 'C1', 'C2'];
    const genLevelList = ['Fresher', 'Junior', 'Senior'];
    const [levelList, setLevelList] = useState([] as string[]);

    function onChangeTestType(value: any) {

        if (value[0] === 'ENG') {
            setTestType('ENG');
            setLevelList(engLevelList);
        }
        else if (value[0] === 'GEN') {
            setTestType('GEN');
            setLevelList(genLevelList);
        }
    }


    const mapLevel = (n: any) => {
        switch (n) {
            case 1: return 'B1';
            case 2: return 'B2';
            case 3: return 'C1';
            case 4: return 'C2';
            default: return 'X';
        }
    }
    const [testData, setTestData] = useState([] as ITest[]);
    const url = 'https://demo.uiza.vn/tests';
    const {loading, error, data} = useFetch(url, 'GET');
    useEffect(() => {
        if(error == null && data != null) {
            setTestData(data);
        } 
    }, [data]);
    console.log("Check Data:", testData);

    const handleLevelClick = (l: any) => {
        const li = document.getElementsByClassName('mark-lv');

        if (li != null) {
            const ar = Array.from(li);
            ar.forEach((el: any) => {
                el.style.color = 'black';
                el.style.backgroundColor = 'white';
            })
        }

        const el = document.getElementById(l);

        if (el != null) {
            el.style.color = 'white';
            el.style.backgroundColor = 'black';
        }

        setLevel(l);
    }

    const handleRemoveLevelCLick = () => {
        const li = document.getElementsByClassName('mark-lv');
        if (li != null) {
            const ar = Array.from(li);
            ar.forEach((el: any) => {
                el.style.color = 'black';
                el.style.backgroundColor = 'white';
            })
        }

        setLevel('');
    }

    const handleSearch = () => {
        let tempRs = [] as ITest[];

        const name = testname;
        const type = testType;
        const lv = level;

        if(name.length === 0) {
            if(lv.length === 0) {
                if(type.length !== 0) {
                    testData.forEach(t => {
                        if(t.type === type) {
                            tempRs.push(t);
                        }
                    }); 
                }
            } else {
                if(type.length === 0) {
                    testData.forEach(t => {
                        if(t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if(t.type === type && t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                }
            }
        } else {
            if(type.length === 0) {
                if(lv.length === 0) {
                    testData.forEach(t => {
                        if(t.name === name) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if(t.name === name && t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                }
            } else {
                if(lv.length === 0) {
                    testData.forEach(t => {
                        if(t.name === name && t.type === type) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if(t.name === name && t.type === type && t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                }
            }
        }
        setIsSearching(true);
        setRsSearch(tempRs);

    }

    const [testItem, setTestItem] = useState([] as ITest[]);

    let tempCodes = [] as string[];

    const dispatch = useAppDispatch();

    const reduxTest = useAppSelector(selectTest);

    const selectedCandidate = reduxTest.candidates[0];
    const [candidatesHad, setCandidatesHad] = useState([] as ICandidate[]);

    useEffect(() => {
        let rs = [] as ICandidate[];
        rs.push(selectedCandidate);
        console.log("CAN HAD: ", candidatesHad);
        if(candidatesHad.length > 0) {
            let update = [] as ICandidate[];
            candidatesHad.forEach(c => {
                console.log('Code: ', c.code);
                console.log('Old code: ', selectedCandidate.code);
                if(c.code !== selectedCandidate.code) {
                    console.log("Is here");
                    update.push(c);
                }
            })
            console.log('update list', update);
            if(update.length > 0) {
                update.forEach(c => {
                    rs.push(c);
                })
            }
        }
        console.log("Rs list: ", rs);
        dispatch(updateCandidates(rs));
    }, [candidatesHad]);

    const [candidateCodeList, setCandidateCodeList] = useState([] as string[]);

    useEffect(() => {
        let codes = [] as string[];
        reduxTest.candidates.forEach(c => {
            codes.push(c.code);
        });
        setCandidateCodeList(codes);
    }, [reduxTest.candidates])

    const handleTestClick = (code: any) => {
        
        let whereToFind = [] as ITest[];
        let rs = [] as ITest[];
        !isSearching ? whereToFind = testData : whereToFind = rsSearch; 

        whereToFind.forEach(t => {
            if(t.code === code) {
                rs.push(t);
                // Set list candidate for this test
                setCandidatesHad(t.candidates);
                // Set redux state
                dispatch(updateId(t.id));
                dispatch(updateCode(t.code));
                dispatch(updateType(t.type));
                dispatch(updateName(t.name));
                dispatch(updateLevel(t.level));
                dispatch(updateQas(t.qas));
                setTestItem(rs);

                return;
            }
        });
    }
    
    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);

    const success = () => {
        message.success('Test Saved');
      };
      
      const errorm = () => {
        message.error('An error occur');
      };
    useEffect(() => {
        if(res != null) success();
        if(err != null) errorm();
    }, [res, err])

    const onSave = () => {
        const testCode = testItem.length > 0 ? testItem[0].code : '';
        if(testCode.length === 0) return;

        const body = {
            candidates: reduxTest.candidates
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        const fetchData = async () => {
            try {
                const upUrl = 'https://demo.uiza.vn/tests/' + '' + reduxTest.id;
                const res = await fetch(upUrl, requestOptions);
                const json = await res.json();

                setRes(json);
            } catch (error: any) {
                setErr(error);
            }
        }
        fetchData();       
    }

    const QuestionItem = (props: any) => {
        const [detail, setDetail] = useState({
            index:'',
            state: false
        });

        useEffect(() => {
            const el1 = document.getElementById('demo-qa-'+detail.index);
            const el2 = document.getElementById('ans-detail-'+detail.index);

            if (el1 != null && el2 != null) {
                if (!detail.state) {
                    el1.classList.add('hide-long-text');
                    el2.classList.add('hide');
                }
                else {
                    el1.classList.remove('hide-long-text');
                    el2.classList.remove('hide');
                }
            }
        },[detail.state])

        const handleDetail = (i: any) => {
            setDetail({
                index: i,
                state: !detail.state
            });
        }

        const handleRemoveQuestion = (ind: any) => {
            if(testItem.length > 0 && ind > -1) {
                // const oldQa = testItem[0].qas;
                // const newQa = [] as QA[];
                // let qItem = [] as QData[];

                // for(let i = 0; i < oldQa.length; i++) {
                //     if(i != ind) newQa.push(oldQa[i]);

                // }
                
                // const r = questionItem[0];
                // r.qa = newQa;
                // qItem.push(r);
                // setQuestionItem(qItem);

            }
        }

        return (
            <li key={props.index}>
                <span className='abs'><PlusOutlined /></span>
                <div className='demo-test-box' onClick={() => handleDetail(props.index)}>
                    <span className='ic-close' onClick={() => handleRemoveQuestion(props.index)}><CloseCircleFilled /></span>
                    <div id={'demo-qa-' + props.index} className='hide-long-text'>
                        <CheckSquareFilled /> {props.data.question}
                        <div id={'ans-detail-' + props.index} className='hide'>
                            <ul className='ans-list'>
                                {/* {props.data.choose.map((c: any) => (
                                    <li><Checkbox>{c}</Checkbox></li>
                                ))} */}
                                <li><Checkbox>A.&nbsp;{props.data.A}</Checkbox></li>
                                <li><Checkbox>B.&nbsp;{props.data.B}</Checkbox></li>
                                <li><Checkbox>C.&nbsp;{props.data.C}</Checkbox></li>
                                <li><Checkbox>D.&nbsp;{props.data.D}</Checkbox></li>
                            </ul>
                            <span className='row-between pd-x-20'>
                                <span>Đáp án: {props.data.answer}</span>
                                <span>Edit</span>
                            </span>
                        </div>
                    </div>
                    <div className='center'>
                        <span className='sm-ic'>{!detail.state ? <DownOutlined /> : <UpOutlined />}</span>
                    </div>
                </div>

            </li>
        )
    }

    const onSelectAns = () => {
        console.log('x');
    }

    return (
        <div className='pdt-50'>
            <HeaderD />
            <Row>
                <Col span={6} className='pd-20 bdr mgt-20'>
                    <div className='sticky-sec col'>
                        <span>
                            <span className='font'>Bài test</span>
                            <Cascader size="small" options={options} onChange={onChangeTestType} />
                        </span>

                        <div className='special col'>
                            <span>Tên bài test</span>
                            <Input placeholder='Tên bài test' onChange={enterTestname}></Input>
                            <span className='mgt-10'>Level</span>
                            <div className='row-between'>
                                <ul className='lv-list'>
                                    {levelList.map((l, i) => (
                                        <li id={l} key={i + 1} onClick={() => handleLevelClick(l)} className='mark-lv'><span>{l}</span></li>
                                    ))}
                                </ul>
                                <Button className='btn-delete' onClick={handleRemoveLevelCLick} icon={<CloseOutlined />}>
                                    Xóa lọc
                                </Button>
                            </div>
                        </div>

                        <span className='mgt-20 center'>
                            <Button className='btn-search' onClick={handleSearch} icon={<SearchOutlined />}>
                                Tìm
                            </Button>
                            <Button className='btn-add' icon={<PlusOutlined />}>
                                Thêm
                            </Button>
                        </span>
                    </div>
                    <ul className='rs-test-list'>
                        {!isSearching ? testData.map((t, i) => (
                            <li key={i} onClick={() => handleTestClick(t.code)}>
                                
                                <span className='lv-cir'>{t.level}</span>
                                
                                <span>{t.name}</span>
                            </li>
                        )) : rsSearch.map((t, i) => (
                            <li key={i} onClick={() => handleTestClick(t.code)}>
                                <span className='lv-cir'>{t.level}</span>
                                <span>{t.name}</span>
                            </li>
                        ))
                        }
                    </ul>
                </Col>

                <Col span={5} className='pd-20 bdr mgt-20'>
                    <div className='sticky-sec'>
                        <span className='font'>Câu hỏi</span>
                        <Button className='btn-cre'>Tạo câu hỏi</Button>
                    </div>

                    <ul className='qs-list mgt-20'>
                        {(testItem.length > 0) ? testItem[0].qas.map((qa: any, i) => (
                            <QuestionItem data={qa} index={i}/>
                        )) : <></>}
                        
                    </ul>
                </Col>
                <Col span={13} className='pd-20 mgt-20'>
                    <div className='sticky-sec col'>
                        <span className='font'>Demo</span>
                        <div className='row-center-y'>
                            <div className='col'>
                                <span>Tên bài test</span>
                                <span className='box mgt-10 row-center-y'>{testItem.length > 0 ? testItem[0].name : ''}</span>
                                <span className='row-between mgt-10'>
                                    
                                    <ul className='lv-list'>
                                    {levelList.map((l, i) => (
                                        <li id={l} key={i + 1}><span>{l}</span></li>
                                    ))}
                                    </ul>
                                    <span className='row-center-y'>
                                        <FieldTimeOutlined className='big-time-ic' />
                                        <span className='sm-box'>Time here</span>
                                    </span>
                                </span>
                            </div>
                            <div className='col mgl-10'>
                                <span>Tham gia test</span>
                                <div className='lar-box mgt-10'>
                                    <ul className='can-list'>
                                        {candidateCodeList.length > 0 ? 
                                            candidateCodeList.map(code => (
                                                <li>{code} <CloseOutlined className='mgl-5' /></li>
                                            ))
                                            : 
                                            <></>
                                        }
                                    </ul>
                                </div>
                            </div>

                            <Button className='btn-save mgl-10' onClick={onSave}>Lưu</Button>
                        </div>
                        <ul className='demo-qs-list'>
                            
                            {testItem.length > 0 ? testItem[0].qas.map((q) => (
                                <li>
                                <span><CloseOutlined />{q.question}</span>
                                <ul className='qs-ans-list'>
                                    {/* {q.choose.length > 0 ? q.choose.map((c) => (
                                        <li>
                                            <Checkbox onChange={onSelectAns}>{c}</Checkbox>
                                        </li>
                                    ))
                                    
                                    : <></>} */}
                                    <li>
                                        <Checkbox onChange={onSelectAns}>A.&nbsp;{q.A}</Checkbox>
                                    </li>
                                    <li>
                                        <Checkbox onChange={onSelectAns}>B.&nbsp;{q.B}</Checkbox>
                                    </li>
                                    <li>
                                        <Checkbox onChange={onSelectAns}>C.&nbsp;{q.C}</Checkbox>
                                    </li>
                                    <li>
                                        <Checkbox onChange={onSelectAns}>D.&nbsp;{q.D}</Checkbox>
                                    </li>
                                </ul>   
                            </li>
                            )) : <></>}
                        </ul>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default Question;