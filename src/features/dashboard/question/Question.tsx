import { CheckSquareFilled, CloseCircleFilled, CloseOutlined, DownOutlined, FieldTimeOutlined, FilterFilled, PlusOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import HeaderD from '../headerD/HeaderD';
import './Question.css';

interface QA {
    question: string;
    choose: string[];
    answer: string;
}

interface QData {
    type: string;
    code: string;
    title: string;
    level: string;
    qa: QA[];
}

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

const Question = () => {
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



    // Search by test title
    const [titleIn, setTitleIn] = useState('');

    const [rsSearch, setRsSearch] = useState([] as QData[]);

    const inp = (e: any) => {
        console.log(e.target.value);
        setTitleIn(e.target.value);
    }

    const engLevelList = ['B1', 'B2', 'C1', 'C2'];
    const genLevelList = ['Fresher', 'Junior', 'Senior'];
    const [showLevelList, setShowLevelList] = useState([] as string[]);
    function onChangeTestType(value: any) {
        console.log(value);
        if (value[0] === 'ENG') {
            setShowLevelList(engLevelList);
        }
        else if (value[0] === 'GEN') {
            setShowLevelList(genLevelList);
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

    const [level, setLevel] = useState('');

    const handleLevelClick = (l: any) => {
        console.log(l);

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
        let tempRs: QData[] = [];

        const tit = titleIn.trim();

        if (tit.length == 0 && level.length == 0) return;

        else if (tit.length == 0 && level.length > 0) {
            // Search by level
            qsData.forEach(qs => {
                if (qs.level === level) tempRs.push(qs);
            })
        }

        else if (tit.length > 0 && level.length == 0) {
            // Search by name
            qsData.forEach(qs => {
                if (qs.title === tit) tempRs.push(qs);
            })
        }

        else if (tit.length > 0 && level.length > 0) {
            // Search by both
        }

        for (let i = 0; i < qsData.length; i++) {
            if (qsData[i].title === titleIn) tempRs.push(qsData[i]);
        }
        if (tempRs.length == 0) setRsSearch([]);
        else setRsSearch(tempRs);
    }

    const [questionItem, setQuestionItem] = useState([] as QData[]);
    
    const handleTestClick = (code: any) => {
        let qs = [] as QData[];
        rsSearch.forEach( rs => {
            if(rs.code === code) {
                qs.push(rs);
                console.log("DEBUG: ", qs);
                setQuestionItem(qs);
                return;
            }
        });
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
            if(questionItem.length > 0 && ind > -1) {
                const oldQa = questionItem[0].qa;
                const newQa = [] as QA[];
                let qItem = [] as QData[];

                for(let i = 0; i < oldQa.length; i++) {
                    if(i != ind) newQa.push(oldQa[i]);

                }
                
                const r = questionItem[0];
                r.qa = newQa;
                qItem.push(r);
                setQuestionItem(qItem);

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
                                {props.data.choose.map((c: any) => (
                                    <li><Checkbox>{c}</Checkbox></li>
                                ))}
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
                            <Input placeholder='Tên bài test' onChange={inp}></Input>
                            <span className='mgt-10'>Level</span>
                            <div className='row-between'>
                                <ul className='lv-list'>
                                    {showLevelList.map((l, i) => (
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
                        {rsSearch.map((q, i) => (
                            <li key={i} onClick={() => handleTestClick(q.code)}>
                                <span className='lv-cir'>{q.level}</span>
                                <span>{q.title}</span>
                            </li>
                        ))}
                    </ul>
                </Col>

                <Col span={5} className='pd-20 bdr mgt-20'>
                    <div className='sticky-sec'>
                        <span className='font'>Câu hỏi</span>
                        <Button className='btn-cre'>Tạo câu hỏi</Button>
                    </div>

                    <ul className='qs-list mgt-20'>
                        {(questionItem.length > 0) ? questionItem[0].qa.map((qa: any, i) => (
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
                                <span className='box mgt-10 row-center-y'>Test - 2</span>
                                <span className='row-between mgt-10'>
                                    
                                    <ul className='lv-list'>
                                    {showLevelList.map((l, i) => (
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
                                        <li>BC0111 <CloseOutlined className='mgl-5' /></li>
                                        <li>BC0222 <CloseOutlined className='mgl-5' /></li>
                                    </ul>
                                </div>
                            </div>

                            <Button className='btn-save mgl-10'>Lưu</Button>
                        </div>
                        <ul className='demo-qs-list'>
                            
                            {questionItem.length > 0 ? questionItem[0].qa.map((q) => (
                                <li>
                                <span><CloseOutlined />{q.question}</span>
                                <ul className='qs-ans-list'>
                                    
                                    {q.choose.length > 0 ? q.choose.map((c) => (
                                        <li>
                                            <Checkbox onChange={onSelectAns}>{c}</Checkbox>
                                        </li>
                                    )) : <></>}
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