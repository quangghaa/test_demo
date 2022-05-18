
import { Button, Cascader, Input, Modal, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { useEffect, useState } from 'react';
import { createOne } from '../../../services/api';
import { IChoice, IQA } from '../../interface';
import statusNotification from '../../notification/Notification';
import './QuestionCollection.css';
import QuestionItem from './QuestionItem';


const Question = (props: any) => {

    const lev = [
        {
            value: '1',
            label: 'Intern'
        },
        {
            value: '2',
            label: 'Fresher'
        },
        {
            value: '3',
            label: 'Junior'
        }
    ];

    const [selectedLevel, setSelectedLevel] = useState('');

    const questionLevModal = lev;

    const quesType = 1;

    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(0);

    const [questionList, setQuestionList] = useState([] as IQA[]);

    const [qContent, setQContent] = useState('');

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [questionBody, setQuestionBody] = useState({
        type: {
            id: 0
        },
        subject: {
            id: 0
        },
        content: '',
        level: {
            id: 0
        },
        multipleChoiceQuestions: [] as IChoice[]
    } as IQA);

    const [isEdit, setIsEdit] = useState(false);

    const [abcd, setAbcd] = useState({
        a: {
            answer: '',
            isTrue: 0
        },
        b: {
            answer: '',
            isTrue: 0
        },
        c: {
            answer: '',
            isTrue: 0
        },
        d: {
            answer: '',
            isTrue: 0
        }
    })


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

    useEffect(() => {
        if (selectedLevel.length > 0) {
            try {
                const body = {
                    id: parseInt(selectedLevel)
                }
                const getQuestionByLevel = async () => {
                    setLoading(true);
                    const res = await createOne(`staff/getquestionbylevel`, body);
                    if (res.status === 200 && res.data != null) {
                        setQuestionList(res.data);
                    }
                }

                getQuestionByLevel();
            } finally {
                setLoading(false);
            }
        }

    }, [reload])

    const reloadData = () => {
        setReload(reload => reload + 1);
    }

    const onSelectLev = async (value: any) => {

        setSelectedLevel(value[0]);
        setReload(reload => reload + 1);

        // try {
        //     const body = {
        //         id: parseInt(value[0])
        //     }
        //     setLoading(true);

        //     const res = await getList(`staff/getquestionbylevel`, body);
        //     if (res.status === 200 && res.data != null) {
        //         setQuestionList(res.data);
        //     }
        // } finally {
        //     setLoading(false);
        // }
    }

    const onSelectType = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }

        setQuestionBody({ ...questionBody, subject: obj });
    }

    const onSelectKind = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }

        setQuestionBody({ ...questionBody, type: obj });
    }

    const onSelectLevModal = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }

        setQuestionBody({ ...questionBody, level: obj });
    }

    const enterQContent = (e: any) => {
        setQuestionBody({ ...questionBody, content: e.target.value });
    }

    const enterChoice = (e: any, i: any) => {
        switch (i) {
            case 0: {
                setAbcd({ ...abcd, a: { answer: e.target.value, isTrue: 0 } });
                break;
            }
            case 1: {
                setAbcd({ ...abcd, b: { answer: e.target.value, isTrue: 0 } });
                break;
            }
            case 2: {
                setAbcd({ ...abcd, c: { answer: e.target.value, isTrue: 0 } });
                break;
            }
            case 3: {
                setAbcd({ ...abcd, d: { answer: e.target.value, isTrue: 0 } });
                break;
            }
            default: {

            }
        }
    }

    const enterRealAns = (e: any) => {
        setRealAns(e.target.value);
    }

    const setmode = () => {
        setIsEdit(true);
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        console.log("Real ans: ", realAns.toLocaleLowerCase(), abcd);

        let mc = [];

        if (abcd.a.answer) {
            let temp = {
                answer: abcd.a.answer,
                isTrue: 0
            }
            if (realAns.toLowerCase() === 'a') {
                temp.isTrue = 1
            }

            mc.push(temp);
        }

        if (abcd.b.answer) {
            let temp = {
                answer: abcd.b.answer,
                isTrue: 0
            }
            if (realAns.toLowerCase() === 'b') {
                temp.isTrue = 1
            }

            mc.push(temp);
        }

        if (abcd.c.answer) {
            let temp = {
                answer: abcd.c.answer,
                isTrue: 0
            }
            if (realAns.toLowerCase() === 'c') {
                temp.isTrue = 1
            }

            mc.push(temp);
        }

        if (abcd.d.answer) {
            let temp = {
                answer: abcd.d.answer,
                isTrue: 0
            }
            if (realAns.toLowerCase() === 'd') {
                temp.isTrue = 1
            }

            mc.push(temp);
        }

        const body = { ...questionBody, multipleChoiceQuestions: mc };
        console.log("BODY: ", body);

        try {
            setLoading(true);
            const res = await createOne('staff/addquestion', body);

            if (res) {
                setVisible(false);
                setReload(reload => reload + 1);
                statusNotification(true, "Thêm câu hỏi thành công")
            }
        } catch (error) {
            statusNotification(false, "Thêm câu hỏi thất bại")
        } finally {
            setLoading(false);
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
            case 5: return 'E';
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

            {visible && (
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
                        <Cascader options={questionTypes} onChange={onSelectType} placeholder='Chọn loại câu hỏi' />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>Dạng câu hỏi: </span>
                        <Cascader options={questionKinds} onChange={onSelectKind} placeholder='Chọn dạng câu hỏi' />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>Mức độ: </span>
                        <Cascader options={questionLevModal} onChange={onSelectLevModal} placeholder='Chọn mức độ câu hỏi' />
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
                        <span>Đáp án (A, B or C): </span>
                        <Input onChange={enterRealAns} placeholder='Nhập đáp án' className='w-250'></Input>
                    </span>

                </Modal>
            )}

            <ul className='qs-list mgt-20'>
                {questionList.length > 0 ?

                    questionList.map((q: any, i: any) => {
                        return <QuestionItem data={q} index={i} reload={reloadData} />
                    })
                    :
                    <></>
                }
            </ul>

        </>


    )
}

export default Question;