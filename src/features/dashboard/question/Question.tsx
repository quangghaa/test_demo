import { CheckSquareFilled, CloseCircleFilled, CloseOutlined, ConsoleSqlOutlined, DownOutlined, FieldTimeOutlined, FilterFilled, PlusOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, message, Modal, Row, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useFetch from '../../../hook/useFetch';
import { ICandidate, IQA, ITest, QA, QData } from '../../interface';
import { addCandidate, addQa, deleteQa, selectTest, updateCandidates, updateCode, updateId, updateLevel, updateName, updateQas, updateType } from '../../reducer/testSlice';
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

    const [testSubjectSearch, setTestSubjectSearch] = useState(0);

    const [testname, setTestname] = useState('');

    const [level, setLevel] = useState(0);

    const [isSearching, setIsSearching] = useState(false);
    const [rsSearch, setRsSearch] = useState([] as ITest[]);

    const enterTestname = (e: any) => {
        console.log(e.target.value);
        setTestname(e.target.value);
    }

    const engLevelList = [1, 2, 3, 4];
    const genLevelList = [1, 2, 3];
    const [levelList, setLevelList] = useState([] as number[]);

    function onChangeTestType(value: any) {

        if (value[0] === 'ENG') {
            setTestSubjectSearch(1);
            setLevelList(engLevelList);
        }
        else if (value[0] === 'GEN') {
            setTestSubjectSearch(2);
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
    const [reload, setReload] = useState(false);
    // const url = 'https://demo.uiza.vn/tests';
    const url = 'http://localhost:8080/staff/getalltest'
    const { loading, error, data } = useFetch(url, 'GET', reload);
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

        setLevel(0);
    }

    const handleSearch = () => {
        let tempRs = [] as ITest[];

        const name = testname;
        const type = testSubjectSearch;
        const lv = level;

        if (name.length === 0) {
            if (lv === 0) {
                if (type > 0) {
                    testData.forEach(t => {
                        if (t.subject === type) {
                            tempRs.push(t);
                        }
                    });
                }
            } else {
                if (type === 0) {
                    testData.forEach(t => {
                        if (t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if (t.subject === type && t.level === lv) {
                            tempRs.push(t);
                        }
                    });
                }
            }
        } else {
            if (type === 0) {
                if (lv === 0) {
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
                if (lv === 0) {
                    testData.forEach(t => {
                        if (t.name === name && t.subject === type) {
                            tempRs.push(t);
                        }
                    });
                } else {
                    testData.forEach(t => {
                        if (t.name === name && t.subject === type && t.level === lv) {
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

    console.log("Selected cand: ", selectedCandidate);
    const [candidatesHad, setCandidatesHad] = useState([] as ICandidate[]);

    useEffect(() => {
        let rs = [] as ICandidate[];
        if (selectedCandidate != null) {
            rs.push(selectedCandidate);
            if (candidatesHad?.length > 0) {
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
            if (candidatesHad?.length > 0) {
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
            if (t.codeTest === code) {
                rs.push(t);
                // Set list candidate for this test
                setCandidatesHad(t.candidates);
                // Set redux state
                dispatch(updateId(t.id));
                dispatch(updateCode(t.codeTest));
                dispatch(updateType(t.subject));
                dispatch(updateName(t.name));
                dispatch(updateLevel(t.level));
                // dispatch(updateQas(t.qas));
                dispatch(updateQas(t.questions));
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
        const testCode = testItem.length > 0 ? testItem[0].codeTest : '';
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

    const handleRemoveQuestion = (qId: number) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        const fetchData = async () => {
            try {
                const rmUrl = 'http://localhost:8080/staff/removequestion' + '/' + qId + '/' + reduxTest.id;
                const res = await fetch(rmUrl, requestOptions);
                const json = await res.json();
                if(json) {
                    reloadTest();
                }
            } catch (error: any) {
                // setErr(error);
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

                // const oldQa = testItem[0].qas;
                const oldQa = testItem[0].questions;
                let newQa = [] as IQA[];

                for (let i = 0; i < oldQa.length; i++) {
                    if (i !== ind) newQa.push(oldQa[i]);
                }

                const x = [
                    {
                        id: oldTestItem.id,
                        codeTest: oldTestItem.codeTest,
                        subject: oldTestItem.subject,
                        name: oldTestItem.name,
                        level: oldTestItem.level,
                        candidates: oldTestItem.candidates,
                        // qas: newQa
                        questions: newQa
                    }
                ]

                dispatch(deleteQa(ind));

                setTestItem(x);

            }
        }

        const removeQuestion = (qId: any, index: any) => {
            handleRemoveQuestion(index);
            props.func(qId);
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
                    <span className='ic-close' onClick={() => removeQuestion(props.data.id, props.index)}><CloseCircleFilled /></span>
                    <div id={'demo-qa-' + props.index} className='hide-long-text'>
                        <CheckSquareFilled /> {props.data.content}
                        <div id={'ans-detail-' + props.index} className='hide'>
                            <ul className='ans-list'>
                                {props.data.multipleChoiceQuestions.map((c: any) => (
                                    <li><Checkbox>{c.answer}</Checkbox></li>
                                ))}
                            </ul>
                            <span className='row-between pd-x-20'>
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


    const [testSubject, setTestSubject] = useState(0);
    const [testCode, setTestCode] = useState('');
    const [testName, setTestName] = useState('');
    const [testLevel, setTestLevel] = useState(0);
    const [doTime, setDoTime] = useState('');

    const [qType, setQType] = useState(0);
    const [qSubject, setQSubject] = useState(0);
    const [qLevel, setQLevel] = useState(0);
    const [qContent, setQContent] = useState('');
    const [mchoice, setMchoice] = useState([
        {
            isTrue: 0,
            answer: ''
        }
    ])

    // Modal Create + Edit
    const handleLogin = () => {
        console.log('Login');
        setVisible(true);
    }

    const [visible, setVisible] = useState(false);
    const [visibleTest, setVisibleTest] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const [isEdit, setIsEdit] = useState(false);

    const setmode = () => {
        setIsEdit(true);
    }

    const showModal = () => {
        setVisible(true);
    };

    const showTestModal = () => {
        setVisibleTest(true);
    }

    // ----------
    const questionTypes = [
        {
            value: '1',
            label: 'Trắc nghiệm'
        },
        {
            value: '2',
            label: 'Điền từ'
        },
    ];

    const testTypes = [
        {
            value: '1',
            label: 'Tiếng anh'
        },
        {
            value: '2',
            label: 'Kiến thức chung'
        },
    ];

    const [quesType, setQuesType] = useState(1);

    function selectQuestionType(value: any) {
        console.log(value);
        if(value !== undefined) setQuesType(parseInt(value[0]));
    }

    function selectedTestType(value: any) {
        console.log(value);
        setTestSubject(parseInt(value));
    }

    const enterCode = (e: any) => {
        setTestCode(e.target.value);
    }

    const enterName = (e: any) => {
        setTestName(e.target.value);
    }

    const enterLevel = (e: any) => {
        setTestLevel(parseInt(e.target.value));
    }

    const reloadTest = () => {
        setReload(!reload);
    }

    const [addTestRes, setAddTestRes] = useState(null);
    const [addTestErr, setAddTestErr] = useState(null);

    const hanldeSaveTest = () => {

        if(testSubject === 0 || testName.trim().length === 0 || testCode.trim().length === 0 || testLevel === 0) {
            errorm();
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    subject: testSubject,
                    name: testName.trim(),
                    codeTest: testCode.trim(),
                    level: testLevel
                }
            )
        }
        const addUrl = 'http://localhost:8080/staff/addtest';

        const fetchData = async () => {
            try {
                const res = fetch(addUrl, requestOptions);
                const json = (await res).json();
                json.then(value => {
                    if(value) {
                        success();
                        reloadTest();
                    }
                })

            } catch (error: any) {
                setAddTestErr(error);
            }
        }
        fetchData();
        setVisibleTest(false);
        setTestSubject(0);
        setTestCode('');
        setTestName('');
        setTestLevel(0);
        setDoTime('');
    }

    const handleCancelTest = () => {
        setVisibleTest(false);
        setTestSubject(0);
        setTestCode('');
        setTestName('');
        setTestLevel(0);
        setDoTime('');
    }

    const enterTime = (time: any, timeString: string) => {
        setDoTime(timeString);
    }

    const enterQType = (value: any) => {
        setQType(value);
    }

    const enterQContent = (e: any) => {
        setQContent(e.target.value);
    }

    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');

    const [realAns, setRealAns] = useState('');

    const enterChoice = (e: any, i: any) => {
        console.log("XXX: ", e.target.value, i);
        switch(i) {
            case 0: {
                setA(e.target.value);
                break;
            }
            case 1: {
                setB(e.target.value);
                break;
            }
            case 2: {
                setC(e.target.value);
                break;
            }
            case 3: {
                setD(e.target.value);
                break;
            }
        }
    }

    const enterRealAns = (e: any) => {
        setRealAns(e.target.value);
    }


    const handleOk = () => {
        const subject = testItem.length > 0 ? testItem[0].subject : 0;
        const level = testItem.length > 0 ? testItem[0].level : 0;
        const type = qType;
        const content = qContent;
        const ra = realAns;

        console.log("Real ans: ", ra);

        let mc = [{
            isTrue: 0,
            answer: ''
        }];
        mc.pop();
        if(a.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if(a === ra) {
                t = {
                    isTrue: 1,
                    answer: a
                }
                
            } else {
                t = {
                    isTrue: 0,
                    answer: a
                }
            }
            mc.push(t);
        }
        if(b.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if(b === ra) {
                t = {
                    isTrue: 1,
                    answer: b
                }
                
            } else {
                t = {
                    isTrue: 0,
                    answer: b
                }
            }
            mc.push(t);
        }
        if(c.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if(c === ra) {
                t = {
                    isTrue: 1,
                    answer: c
                }
                
            } else {
                t = {
                    isTrue: 0,
                    answer: c
                }
            }
            mc.push(t);
        }
        if(d.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if(d === ra) {
                t = {
                    isTrue: 1,
                    answer: d
                }
                
            } else {
                t = {
                    isTrue: 0,
                    answer: d
                }
            }
            mc.push(t);
        }

        console.log('CHeck here: ', mc);

        const body = {
            type: type,
            subject: subject,
            content: content,
            level: level,
            multipleChoiceQuestions: mc
        }

        dispatch(addQa(body));

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        const fetchData = async () => {
            try {
                const upUrl = testItem.length > 0 ? 'http://localhost:8080/staff/addquestiontotest/' + testItem[0].id : '';
                const res = await fetch(upUrl, requestOptions);
                const json = await res.json();

                json.then(() => {
                    console.log('OKE DONE');
                    setVisible(false);
                })
            } catch (error: any) {
                setVisible(false);
            }
        }
        fetchData();

        setIsEdit(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsEdit(false);
        setVisible(false);
    };

    const range = [1, 2, 3, 4];
    const mapABC = (n: number) => {
        switch (n) {
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
                                        <li id={l.toString()} key={i + 1} onClick={() => handleLevelClick(l)} className='mark-lv'><span>{l}</span></li>
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
                            <Button className='btn-add' icon={<PlusOutlined />} onClick={showTestModal}>
                                Thêm
                            </Button>
                        </span>

                        <Modal
                            title='Thêm bài test'
                            visible={visibleTest}
                            // confirmLoading={confirmLoading}
                            onCancel={handleCancelTest}
                            className="create-form"
                            footer={[
                                <div className='col'>
                                    <div className='center'>
                                        <Button key="submit" onClick={hanldeSaveTest} className='btn-login'>
                                            Lưu bài test
                                        </Button>

                                        <Button key="cancel" onClick={handleCancelTest} className='btn-login'>
                                            Hủy
                                        </Button>
                                    </div>
                                </div>
                                ,
                            ]}
                        >
                            <span className='row-between'>
                                <span>Loại bài test: </span>
                                <Cascader options={testTypes} value={testSubject as any} onChange={selectedTestType} placeholder="Please select" />
                            </span>
                            <span className='col mgt-10'>
                                <span>Mã bài test: </span>
                                <Input placeholder='Nhập mã bài test' value={testCode} className='' onChange={enterCode}></Input>
                            </span>

                            <span className='col mgt-10'>
                                <span>Tên bài test: </span>
                                <Input placeholder='Nhập tên bài test' value={testName} className=''onChange={enterName}></Input>
                            </span>

                            <span className='col mgt-10'>
                                <span>Cấp độ bài test: </span>
                                <Input placeholder='Nhập tên bài test' value={testLevel} className=''onChange={enterLevel}></Input>
                            </span>

                            <span className='col mgt-10'>
                                <span>Thời gian làm bài: </span>
                                <TimePicker onChange={enterTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                            </span>

                        </Modal>
                    </div>
                    <ul className='rs-test-list'>
                        {!isSearching ? testData.map((t, i) => (
                            <li key={i} onClick={() => handleTestClick(t.codeTest)}>

                                <span className='lv-cir'>{t.level}</span>

                                <span>{t.name}</span>
                            </li>
                        )) : rsSearch.map((t, i) => (
                            <li key={i} onClick={() => handleTestClick(t.codeTest)}>
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
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                            ,
                        ]}
                    >
                        <span>Mã bài test: {testItem.length > 0 ? testItem[0].codeTest : 'Not found'}</span>
                        <span className='row-between'>
                            <span>Chủ đề: {testItem.length > 0 ? testItem[0].subject : 'Not found'}</span>
                            <span>Mức độ: {testItem.length > 0 ? testItem[0].level : 'Not found'}</span>
                        </span>
                        <span className='row-between mgt-20'>
                            <span>Loại câu hỏi: </span>
                            <Cascader options={questionTypes} onChange={enterQType} defaultValue={'Trắc nghiệm' as any} />
                        </span>
                        <span className='col mgt-10'>
                            <span>Câu hỏi: </span>
                            <TextArea rows={2} placeholder='Nhập câu hỏi' onChange={enterQContent}/>
                        </span>
                        {quesType === 1 ? 
                        <div className='mgt-20'>
                            <span>Danh sách câu trả lời: </span>
                            <ul className='enter-ans-list'>
                                {range.map((r, i) => (
                                    <li key={i} className='row-between mgt-10 row-center-y'>
                                        <span>{mapABC(r)}:</span>
                                        <Input onChange={(e: any) => enterChoice(e, i)} className='w-250' placeholder={'Nhập phương án ' + mapABC(r)}></Input>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        <></>
                        }

                        <span className='row-between mgt-20 row-center-y'>
                            <span>Đáp án: </span>
                            <Input onChange={enterRealAns} placeholder='Nhập đáp án' className='w-250'></Input>
                        </span>

                    </Modal>

                    <ul className='qs-list mgt-20'>
                        {(testItem.length > 0) ? testItem[0].questions.map((qa: any, i) => (
                            <QuestionItem data={qa} index={i} edit={showModal} setmode={setmode} func={handleRemoveQuestion} />
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
                                            <li id={l.toString()} key={i + 1}><span>{l}</span></li>
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

                        {testItem.length > 0 ? testItem[0].questions.map((q, i) => (
                            <li>
                                <span>{i + 1}.&nbsp;{q.content}</span>
                                <ul className='qs-ans-list'>
                                    {q.multipleChoiceQuestions.length > 0 ? q.multipleChoiceQuestions.map((c) => (
                                        <li>
                                            <Checkbox onChange={onSelectAns}>{c.answer}</Checkbox>
                                        </li>
                                    ))

                                        : <></>}
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