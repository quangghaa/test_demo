import { CheckSquareFilled, CloseCircleFilled, CloseOutlined, ConsoleSqlOutlined, DownOutlined, FieldTimeOutlined, FilterFilled, PlusOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, message, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useFetch from '../../../hook/useFetch';
import { ICandidate, IQA, ITest, QA, QData } from '../../interface';
import { addCandidate, deleteQa, selectTest, updateCandidates, updateCode, updateId, updateLevel, updateName, updateQas, updateType } from '../../reducer/testSlice';
import HeaderD from '../headerD/HeaderD';
import './Question.css';


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
    const { loading, error, data } = useFetch(url, 'GET');
    useEffect(() => {
        if (error == null && data != null) {
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

        if (name.length === 0) {
            if (lv.length === 0) {
                if (type.length !== 0) {
                    testData.forEach(t => {
                        if (t.type === type) {
                            tempRs.push(t);
                        }
                    });
                }
            } else {
                if (type.length === 0) {
                    testData.forEach(t => {
                        if (t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if (t.type === type && t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                }
            }
        } else {
            if (type.length === 0) {
                if (lv.length === 0) {
                    testData.forEach(t => {
                        if (t.name === name) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if (t.name === name && t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                }
            } else {
                if (lv.length === 0) {
                    testData.forEach(t => {
                        if (t.name === name && t.type === type) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if (t.name === name && t.type === type && t.level === lv) {
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

    const selectedCandidate = reduxTest.candidates.length > 0 ? reduxTest.candidates[0] : null;

    // useEffect(() => {
    //     // First load 
    //     if(reduxTest.id > 0) {
    //         let tem = [] as ITest[];
    //         tem.push(reduxTest);

    //         if(reduxTest.candidates.length > 0) {
    //             let temC = [] as string[];
    //             reduxTest.candidates.map(c => {
    //                 temC.push(c.code);
    //             })
    //             setCandidateCodeList(temC);
    //         }
    //         setTestItem(tem);
    //     }
    // }, [])

    console.log("Selected cand: ", selectedCandidate);
    const [candidatesHad, setCandidatesHad] = useState([] as ICandidate[]);

    useEffect(() => {
        let rs = [] as ICandidate[];
        if (selectedCandidate != null) {
            rs.push(selectedCandidate);
            if (candidatesHad.length > 0) {
                // rs.push(selectedCandidate);
                let update = [] as ICandidate[];
                candidatesHad.forEach(c => {
                    if (c.code !== selectedCandidate.code) {
                        update.push(c);
                    }
                })
                if (update.length > 0) {
                    update.forEach(c => {
                        rs.push(c);
                    })
                }
            }
        } else {
            if (candidatesHad.length > 0) {
                candidatesHad.forEach(c => {
                    rs.push(c)
                })
            }
        }

        console.log("Rs list: ", rs);
        if (rs[0] !== undefined) dispatch(updateCandidates(rs));

    }, [candidatesHad]);

    const [candidateCodeList, setCandidateCodeList] = useState([] as string[]);

    useEffect(() => {
        let codes = [] as string[];
        console.log('Test: ', reduxTest.candidates);
        if (reduxTest.candidates.length > 0) {
            console.log('BIGGER');
            reduxTest.candidates.forEach(c => {
                codes.push(c.code);
            });
        }
        setCandidateCodeList(codes);
    }, [reduxTest.candidates]);



    const handleTestClick = (code: any) => {

        let whereToFind = [] as ITest[];
        let rs = [] as ITest[];
        !isSearching ? whereToFind = testData : whereToFind = rsSearch;

        whereToFind.forEach(t => {
            if (t.code === code) {
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
        if (res != null) success();
        if (err != null) errorm();
    }, [res, err])

    const onSave = () => {
        const testCode = testItem.length > 0 ? testItem[0].code : '';
        if (testCode.length === 0) return;

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
            index: '',
            state: false
        });

        useEffect(() => {
            const el1 = document.getElementById('demo-qa-' + detail.index);
            const el2 = document.getElementById('ans-detail-' + detail.index);

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
        }, [detail.state])

        const handleDetail = (i: any) => {
            setDetail({
                index: i,
                state: !detail.state
            });
        }

        const handleRemoveQuestion = (ind: any) => {
            if (testItem.length > 0 && ind > -1) {
                const oldTestItem = testItem[0];

                const oldQa = testItem[0].qas;
                let newQa = [] as IQA[];

                for (let i = 0; i < oldQa.length; i++) {
                    if (i !== ind) newQa.push(oldQa[i]);
                }

                const x = [
                    {
                        id: oldTestItem.id,
                        code: oldTestItem.code,
                        type: oldTestItem.type,
                        name: oldTestItem.name,
                        level: oldTestItem.level,
                        candidates: oldTestItem.candidates,
                        qas: newQa
                    }
                ]

                dispatch(deleteQa(ind));

                setTestItem(x);

            }
        }

        const onEdit = () => {
            console.log('ON EDIT');
            props.setmode();
            props.edit();
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
                                <span onClick={onEdit}>Edit</span>
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

    // Modal Create + Edit
    const handleLogin = () => {
        console.log('Login');
        setVisible(true);
    }

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const [isEdit, setIsEdit] = useState(false);

    const setmode = () => {
        setIsEdit(true);
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);

        setIsEdit(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsEdit(false);
        setVisible(false);
    };

    // ----------
    const questionTypes = [
        {
          value: '0',
          label: 'Trắc nghiệm'
        },
        {
          value: '1',
          label: 'Điền từ'
        },
      ];
      
      function selectQuestionType(value: any) {
        console.log(value);
      }

      const range = [1, 2, 3, 4];
      const mapABC = (n: number) => {
        switch(n) {
            case 1: return 'A';
            case 2: return 'B';
            case 3: return 'C';
            case 4: return 'D';
            default: return 'Unkown';
        }
      }
    //

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
                        <Button className='btn-cre' onClick={showModal}>Tạo câu hỏi</Button>
                    </div>

                    <Modal
                        title={!isEdit ? 'Tạo câu hỏi' : 'Sửa câu hỏi'}
                        visible={visible}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        className="create-form"
                        footer={[
                            <div className='col'>
                                <div className='center'>
                                        <Button key="submit" loading={confirmLoading} onClick={handleOk} className='btn-login'>
                                            Lưu câu hỏi
                                        </Button>

                                        <Button key="cancel" onClick={handleCancel} className='btn-login'>
                                            Thôi
                                        </Button>
                                </div>
                            </div>
                            ,
                        ]}
                    >
                        <span className='row-between'>
                            <span>Loại câu hỏi: </span>
                            <Cascader options={questionTypes} onChange={selectQuestionType} placeholder="Please select" />
                        </span>
                        <span className='col mgt-10'>
                            <span>Câu hỏi: </span>
                            <TextArea rows={2} placeholder='Nhập câu hỏi' />
                        </span>
                        
                        <div className='mgt-20'>
                            <span>Danh sách câu trả lời: </span>
                            <ul className='enter-ans-list'>
                                {range.map((r) => (
                                    <li className='row-between mgt-10 row-center-y'>
                                        <span>{mapABC(r)}:</span>
                                        <Input className='w-250' placeholder={'Nhập phương án ' + mapABC(r)}></Input>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <span className='row-between mgt-20 row-center-y'>
                            <span>Đáp án: </span>
                            <Input placeholder='Nhập đáp án' className='w-250'></Input>
                        </span>

                    </Modal>

                    <ul className='qs-list mgt-20'>
                        {(testItem.length > 0) ? testItem[0].qas.map((qa: any, i) => (
                            <QuestionItem data={qa} index={i} edit={showModal} setmode={setmode} />
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
                                                code != null ? <li>{code} <CloseOutlined className='mgl-5' /></li> : <></>
                                            ))
                                            :
                                            <></>
                                        }
                                    </ul>
                                </div>
                            </div>

                            <Button className='btn-save mgl-10' onClick={onSave}>Lưu</Button>
                        </div>
                        
                    </div>

                    <ul className='demo-qs-list'>

                            {testItem.length > 0 ? testItem[0].qas.map((q, i) => (
                                <li>
                                    <span>{i + 1}.&nbsp;{q.question}</span>
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
                </Col>
            </Row>

        </div>
    )
}

export default Question;