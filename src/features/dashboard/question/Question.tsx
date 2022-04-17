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
import './QuestionCollection.css';
import QuestionItem from './QuestionItem';


const Question = (props: any) => {

    const [reload, setReload] = useState(false);


    const [testItem, setTestItem] = useState([] as ITest[]);

    const dispatch = useAppDispatch();

    const reduxTest = useAppSelector(selectTest);

    const handleRemoveQuestion = (qId: number) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        const fetchData = async () => {
            try {
                const rmUrl = `${process.env.REACT_APP_BASE_URL}staff/removequestion` + '/' + qId + '/' + reduxTest.id;
                const res = await fetch(rmUrl, requestOptions);
                const json = await res.json();
                if (json) {
                    reloadTest();
                }
            } catch (error: any) {
                // setErr(error);
            }
        }
        fetchData();
    }


    const [qType, setQType] = useState(0);
    const [qContent, setQContent] = useState('');

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const setmode = () => {
        setIsEdit(true);
    }

    const showModal = () => {
        setVisible(true);
    };

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

    const [quesType, setQuesType] = useState(1);

    const reloadTest = () => {
        setReload(!reload);
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
        switch (i) {
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
        if (a.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if (a === ra) {
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
        if (b.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if (b === ra) {
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
        if (c.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if (c === ra) {
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
        if (d.length > 0) {
            let t = {
                isTrue: 0,
                answer: ''
            }
            if (d === ra) {
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
                const upUrl = testItem.length > 0 ? `${process.env.REACT_APP_BASE_URL}staff/addquestiontotest/` + testItem[0].id : '';
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
        <>

            <div className='sticky-sec'>
                <span className='font'>Câu hỏi</span>
                <div className='center'>
                    <Button className='btn-cre' onClick={showModal}>Tạo câu hỏi</Button>
                </div>
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
                    <TextArea rows={2} placeholder='Nhập câu hỏi' onChange={enterQContent} />
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

        </>


    )
}

export default Question;