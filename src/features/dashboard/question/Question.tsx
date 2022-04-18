import { CheckSquareFilled, CloseCircleFilled, CloseOutlined, ConsoleSqlOutlined, DownOutlined, FieldTimeOutlined, FilterFilled, PlusOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, message, Modal, Row, Spin, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useFetch from '../../../hook/useFetch';
import { getList } from '../../../services/api';
import { ICandidate, IQA, ITest, QA, QData } from '../../interface';
import { addCandidate, addQa, deleteQa, selectTest, updateCandidates, updateCode, updateId, updateLevel, updateName, updateQas, updateType } from '../../reducer/testSlice';
import HeaderD from '../headerD/HeaderD';
import './QuestionCollection.css';
import QuestionItem from './QuestionItem';


const Question = (props: any) => {

    const lev = [
        {
            value: '1',
            label: 'A1'
        },
        {
            value: '2',
            label: 'A2'
        },
        {
            value: '3',
            label: 'B1'
        },
        {
            value: '4',
            label: 'B2'
        },
        {
            value: '5',
            label: 'C1'
        },
        {
            value: '6',
            label: 'C2'
        }
    ];

    const questionLevModal = lev;

    const quesType = 1;

    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(false);

    const [questionList, setQuestionList] = useState([] as IQA[]);

    const [testItem, setTestItem] = useState([] as ITest[]);

    const reduxTest = useAppSelector(selectTest);

    const [qType, setQType] = useState(0);
    const [qContent, setQContent] = useState('');

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');

    const [realAns, setRealAns] = useState('');

    const range = [1, 2, 3, 4];

    const questionTypes = [
        {
            value: '1',
            label: 'Tiếng anh'
        },
        {
            value: '2',
            label: 'Kiến thức chung'
        },
    ];

    const questionKinds = [
        {
            value: '1',
            label: 'Trắc nghiệm'
        },
        {
            value: '2',
            label: 'Điền từ'
        },
    ];


    const onSelectLev = async (value: any) => {

        setLoading(true);
        const res = await getList(`staff/getquestionbylevel/${value}`);
        if(res.status === 200 && res.data != null) {
            setQuestionList(res.data);
        }
        
        setLoading(false);
        // console.log("RES: ", res);
    }
    console.log("QLIST: ", questionList);

    const onSelectType = (value: any) => {

    }

    const onSelectKind = (value: any) => {

    }

    const onSelectLevModal = (value: any) => {

    }

    const setmode = () => {
        setIsEdit(true);
    }

    const showModal = () => {
        setVisible(true);
    };

    // ----------

    const reloadTest = () => {
        setReload(!reload);
    }

    const enterQContent = (e: any) => {
        setQContent(e.target.value);
    }

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

    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsEdit(false);
        setVisible(false);
    };

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
                <div>
                    <Cascader size="small" options={lev} onChange={onSelectLev} placeholder='Which level?' />
                    {' '}
                    {loading ? <Spin /> : <></>}
                </div>
                <div className='center'>
                    <Button className='btn-cre mgt-10' onClick={showModal}>Tạo câu hỏi</Button>
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
                <span className='row-between'>
                    <span>Loại câu hỏi: </span>
                    <Cascader options={questionTypes} onChange={onSelectType} defaultValue={'Tiếng anh' as any} />
                </span>
                <span className='row-between mgt-10'>
                    <span>Dạng câu hỏi: </span>
                    <Cascader options={questionKinds} onChange={onSelectKind} defaultValue={'Trắc nghiệm' as any} />
                </span>
                <span className='row-between mgt-10'>
                    <span>Mức độ: </span>
                    <Cascader options={questionLevModal} onChange={onSelectLevModal} defaultValue={'A1' as any} />
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
                {/* {(testItem.length > 0) ? testItem[0].questions.map((qa: any, i) => (
                    <QuestionItem data={qa} index={i} edit={showModal} setmode={setmode} func={handleRemoveQuestion} />
                )) : <></>} */}
                {questionList.length > 0 ?
                    
                    questionList.map((q: any, i: any) => {
                        return <QuestionItem data={q} index={i} />
                    })
                    :
                    <></>
                }
            </ul>

        </>


    )
}

export default Question;