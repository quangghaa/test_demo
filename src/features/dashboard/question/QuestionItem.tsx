
import { PlusOutlined, CloseCircleFilled, DownOutlined, UpOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Cascader, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import TextArea from 'antd/lib/input/TextArea';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteOne, updateOne } from "../../../services/api";
import { IQA, ITest, IChoice } from "../../interface";

import { addQa, selectTest } from "../../reducer/testSlice";
import statusNotification from "../../notification/Notification";
import fakeRequest from "../../../utils/fakeRequest";

const QuestionItem = (props: any) => {
    const [testItem, setTestItem] = useState([] as ITest[]);
    const [detail, setDetail] = useState({
        index: '',
        state: false
    });

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visibleConfirm, setVisibleConfirm] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const [realAns, setRealAns] = useState('');
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
    const questionLevModal = lev;
    const quesType = 1;
    const range = [1, 2, 3, 4];


    const [questionBody, setQuestionBody] = useState({
        type: {
            id: props.data?.type.id
        },
        subject: {
            id: props.data?.subject.id
        },
        content: props.data?.content,
        level: {
            id: props.data?.level.id
        },
        multipleChoiceQuestions: props.data?.multipleChoiceQuestions
    });

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

    const dispatch = useAppDispatch();

    const handleCancel = () => {
        setVisible(false);
    };

    const showModal = (e: any, id: any) => {
        setVisible(id);
    };

    const test = useAppSelector(selectTest);

    const showConfirm = (e: any) => {
        e.stopPropagation();

        setVisibleConfirm(true);
    }

    const questionTypes = [
        {
            value: '1',
            label: 'Ti???ng anh'
        },
        {
            value: '2',
            label: 'Coding'
        },
        {
            value: '3',
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

    const onSelectType = (value: any) => {
        setQuestionBody({ ...questionBody, subject: value[0] });
    }

    const onSelectKind = (value: any) => {
        setQuestionBody({ ...questionBody, type: value[0] });
    }

    const onSelectLevModal = (value: any) => {
        setQuestionBody({ ...questionBody, level: value[0] });
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


    const onYes = async (id: any) => {
        try {
            setLoading(true);
            const res = await deleteOne('staff/deletequestion', id);
            if (res) {

                setVisibleConfirm(false);
                props.reload();
                statusNotification(true, "X??a c??u h???i th??nh c??ng")
            }
        } catch (error) {
            statusNotification(true, "X??a c??u h???i th??nh c??ng")
        } finally {
            setLoading(false);
        }
    }

    const onNo = () => {
        setVisibleConfirm(false);
    }

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

    const onChooseQuestion = (id: any) => {
        let isHad = false;
        test.questions.map(q => {
            if (q.id == id) isHad = true;
        })

        if (isHad) {
            console.log("Already added");
        } else {
            dispatch(addQa(props.data));
        }

    }

    const mapABC = (i: any) => {
        switch (i - 1) {
            case 0: return 'A';
            case 1: return 'B';
            case 2: return 'C';
            case 3: return 'D';
            default: return 'X';
        }
    }

    const handleOk = async (id: any) => {
        console.log("Real ans: ", realAns.toLocaleLowerCase(), abcd);
        let mc = [];

        if (Object.keys(props.data.multipleChoiceQuestions) != null) {
            let temp = {
                id: props.data.multipleChoiceQuestions[0].id,
                answer: abcd.a.answer || props.data.multipleChoiceQuestions[0].answer,
                isTrue: props.data.multipleChoiceQuestions[0].isTrue
            }
            console.log(temp, "----------------------")
            if (realAns.toLowerCase() === 'a') {
                temp.isTrue = 1
                // } else if (props.data.multipleChoiceQuestions[0].isTrue == 1) {
                //     temp.isTrue = 1
            } else {
                temp.isTrue = 0
            }

            mc.push(temp);
        }

        if (Object.keys(props.data.multipleChoiceQuestions) != null) {
            let temp = {
                id: props.data.multipleChoiceQuestions[1].id,
                answer: abcd.b.answer || props.data.multipleChoiceQuestions[1].answer,
                isTrue: props.data.multipleChoiceQuestions[1].isTrue
            }
            console.log(temp, "----------------------")
            if (realAns.toLowerCase() === 'b') {
                temp.isTrue = 1
                // } else if (props.data.multipleChoiceQuestions[1].isTrue == 1) {
                //     temp.isTrue = 1
            } else {
                temp.isTrue = 0
            }

            mc.push(temp);
        }

        if (Object.keys(props.data.multipleChoiceQuestions) != null) {
            let temp = {
                id: props.data.multipleChoiceQuestions[2].id,
                answer: abcd.c.answer || props.data.multipleChoiceQuestions[2].answer,
                isTrue: props.data.multipleChoiceQuestions[2].isTrue
            }
            console.log(temp, "----------------------")
            if (realAns.toLowerCase() === 'c') {
                temp.isTrue = 1
                // } else if (props.data.multipleChoiceQuestions[2].isTrue == 1) {
                //     temp.isTrue = 1
            } else {
                temp.isTrue = 0
            }

            mc.push(temp);
        }

        if (Object.keys(props.data.multipleChoiceQuestions) != null) {
            let temp = {
                id: props.data.multipleChoiceQuestions[3].id,
                answer: abcd.d.answer || props.data.multipleChoiceQuestions[3].answer,
                isTrue: props.data.multipleChoiceQuestions[3].isTrue
            }
            console.log(temp, "----------------------")
            if (realAns.toLowerCase() === 'd') {
                temp.isTrue = 1
                // } else if (props.data.multipleChoiceQuestions[3].isTrue == 1) {
                //     temp.isTrue = 1
            } else {
                temp.isTrue = 0
            }

            mc.push(temp);
        }

        const body = { ...questionBody, multipleChoiceQuestions: mc };

        try {
            setLoading(true);
            await updateOne('staff/editquestion', id, body);
            console.log(body, "bodyyyyyyyyyy")
        } catch (error) {
            statusNotification(false, "C???p nh???t c??u h???i th???t b???i")
        } finally {
            setVisible(false);
            statusNotification(true, "C???p nh???t c??u h???i th??nh c??ng")
            fakeRequest(500)
            window.location.reload()
        }
    };


    return (
        <li key={props.index}>
            <span className='abs-ic' onClick={() => onChooseQuestion(props.data.id)}><PlusOutlined /></span>
            <div className='demo-test-box' onClick={() => handleDetail(props.index)}>
                <span className='ic-close' onClick={(e: any) => showConfirm(e)}><CloseCircleFilled /></span>
                <div id={'demo-qa-' + props.index} className='hide-long-text'>
                    <span>{props.data.content}</span>
                    <div id={'ans-detail-' + props.index} className='hide'>
                        <ul className='ans-list'>
                            {props.data.multipleChoiceQuestions.map((c: any, i: any) => (

                                <li>{c.isTrue != 0 ? <span className="correct-ans"><CheckOutlined /></span> : <></>}
                                    <span>{mapABC(i + 1)}.&nbsp;{c.answer}</span>
                                </li>
                            ))}
                        </ul>
                        <span className='row-between mgt-10 pd-x-20'>
                            <Button shape="round" onClick={() => showModal(props.data, props.data.id)}>Edit</Button>
                        </span>
                    </div>
                </div>
                <div className='center'>
                    <span className='sm-ic'>{!detail.state ? <DownOutlined /> : <UpOutlined />}</span>
                </div>
            </div>
            <Modal
                title="X??c nh???n"
                visible={visibleConfirm}
                onOk={() => onYes(props.data.id)}
                onCancel={onNo}
                okText="C??"
                cancelText="Kh??ng"
            >
                <p>X??a c??u h???i?</p>
            </Modal>

            {visible && (
                <Modal
                    title={'S???a c??u h???i'}
                    visible={visible === props.data.id}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    className="create-form"
                    footer={[
                        <div className='col'>
                            <div className='center'>
                                <Button key="submit" loading={confirmLoading} onClick={() => handleOk(props.data.id)} className='btn-login'>
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
                        <Cascader options={questionTypes} onChange={onSelectType} placeholder={props.data.subject.name} />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>D???ng c??u h???i: </span>
                        <Cascader options={questionKinds} onChange={onSelectKind} placeholder={props.data.type.name} />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>M???c ?????: </span>
                        <Cascader options={questionLevModal} onChange={onSelectLevModal} placeholder={props.data.level.name} />
                    </span>
                    <span className='col mgt-10'>
                        <span>C??u h???i: </span>
                        <TextArea rows={2} placeholder={props.data.content} onChange={enterQContent} />
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
        </li>
    )
}

export default QuestionItem;


