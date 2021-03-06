
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
            label: 'Senior'
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
            label: 'Ti???ng anh'
        },
        {
            value: '2',
            label: 'Ki???n th???c chung'
        },
    ];

    const questionKinds = [
        {
            value: '1',
            label: 'Tr???c nghi???m'
        },
        {
            value: '2',
            label: '??i???n t???'
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
        setReload(reload);
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
                statusNotification(true, "Th??m c??u h???i th??nh c??ng")
            }
        } catch (error) {
            statusNotification(false, "Th??m c??u h???i th???t b???i")
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
                <span className='font'>C??u h???i</span>
                <div>
                    <Cascader size="small" options={lev} onChange={onSelectLev} placeholder='Which level?' />
                    {' '}
                    {loading ? <Spin /> : <></>}
                </div>
                <div className='center'>
                    <Button className='btn-cre mgt-10' onClick={showModal}>T???o c??u h???i</Button>
                </div>
            </div>

            {visible && (
                <Modal
                    title={!isEdit ? 'T???o c??u h???i' : 'S???a c??u h???i'}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    className="create-form"
                    footer={[
                        <div className='col'>
                            <div className='center'>
                                <Button key="submit" loading={confirmLoading} onClick={handleOk} className='btn-login'>
                                    L??u c??u h???i
                                </Button>

                                <Button key="cancel" onClick={handleCancel} className='btn-login'>
                                    H???y
                                </Button>
                            </div>
                        </div>
                        ,
                    ]}
                >
                    <span className='row-between'>
                        <span>Lo???i c??u h???i: </span>
                        <Cascader options={questionTypes} onChange={onSelectType} placeholder='Ch???n lo???i c??u h???i' />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>D???ng c??u h???i: </span>
                        <Cascader options={questionKinds} onChange={onSelectKind} placeholder='Ch???n d???ng c??u h???i' />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>M???c ?????: </span>
                        <Cascader options={questionLevModal} onChange={onSelectLevModal} placeholder='Ch???n m???c ????? c??u h???i' />
                    </span>
                    <span className='col mgt-10'>
                        <span>C??u h???i: </span>
                        <TextArea rows={2} placeholder='Nh???p c??u h???i' onChange={enterQContent} />
                    </span>
                    {quesType === 1 ?
                        <div className='mgt-20'>
                            <span>Danh s??ch c??u tr??? l???i: </span>
                            <ul className='enter-ans-list'>
                                {range.map((r, i) => (
                                    <li key={i} className='row-between mgt-10 row-center-y'>
                                        <span>{mapABC(r)}:</span>
                                        <Input onChange={(e: any) => enterChoice(e, i)} className='w-250' placeholder={'Nh???p ph????ng ??n ' + mapABC(r)}></Input>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        :
                        <></>
                    }

                    <span className='row-between mgt-20 row-center-y'>
                        <span>????p ??n (A, B or C): </span>
                        <Input onChange={enterRealAns} placeholder='Nh???p ????p ??n' className='w-250'></Input>
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