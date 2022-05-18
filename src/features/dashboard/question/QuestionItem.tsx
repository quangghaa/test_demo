import { PlusOutlined, CloseCircleFilled, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Cascader, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import TextArea from 'antd/lib/input/TextArea';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteOne, updateOne } from "../../../services/api";
import { IQA, ITest, IChoice } from "../../interface";

import { addQa, selectTest } from "../../reducer/testSlice";
import statusNotification from "../../notification/Notification";

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
            label: 'Junior'
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
        content: props.data?.content || '',
        level: {
            id: props.data?.level.id
        },
        multipleChoiceQuestions: props.data?.multipleChoiceQuestions || []
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
        console.log(e.multipleChoiceQuestions)
        console.log(questionBody, "question body")
    };

    const test = useAppSelector(selectTest);

    const showConfirm = (e: any) => {
        e.stopPropagation();

        setVisibleConfirm(true);
    }

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


    const onYes = async (id: any) => {
        try {
            setLoading(true);
            const res = await deleteOne('staff/deletequestion', id);
            if (res) {

                setVisibleConfirm(false);
                props.reload();
                statusNotification(true, "Xóa câu hỏi thành công")
            }
        } catch (error) {
            statusNotification(true, "Xóa câu hỏi thành công")
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

            // dispatch(deleteQa(ind));

            setTestItem(x);

        }
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

    const removeQuestion = (qId: any, index: any) => {
        handleRemoveQuestion(index);
        props.func(qId);
    }

    const onEdit = () => {
        console.log('ON EDIT');
        props.setmode();
        props.edit();
    }

    const handleOk = async (id: any) => {
        console.log("Real ans: ", realAns.toLocaleLowerCase(), abcd);

        let mc = [];

        if (abcd.a.answer) {
            let temp = {
                id: props.data.multipleChoiceQuestions[0].id,
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
                id: props.data.multipleChoiceQuestions[1].id,
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
                id: props.data.multipleChoiceQuestions[2].id,
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
                id: props.data.multipleChoiceQuestions[3].id,
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
            console.log(id)
            const res = await updateOne('staff/editquestion', id, body);
            if (res) {

                setVisible(false);
                setReload(reload => reload + 1);
            }

        } finally {
            setLoading(false);
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
                                <li>{mapABC(i + 1)}.&nbsp;{c.answer}</li>
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
                title="Xác nhận"
                visible={visibleConfirm}
                onOk={() => onYes(props.data.id)}
                onCancel={onNo}
                okText="Có"
                cancelText="Không"
            >
                <p>Xóa câu hỏi?</p>
            </Modal>

            {visible && (
                <Modal
                    title={'Sửa câu hỏi'}
                    visible={visible === props.data.id}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    className="create-form"
                    footer={[
                        <div className='col'>
                            <div className='center'>
                                <Button key="submit" loading={confirmLoading} onClick={() => handleOk(props.data.id)} className='btn-login'>
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
                        <Cascader options={questionTypes} onChange={onSelectType} placeholder={props.data.type.id} />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>Dạng câu hỏi: </span>
                        <Cascader options={questionKinds} onChange={onSelectKind} placeholder={props.data.type.name} />
                    </span>
                    <span className='row-between mgt-10'>
                        <span>Mức độ: </span>
                        <Cascader options={questionLevModal} onChange={onSelectLevModal} placeholder={props.data.level.name} />
                    </span>
                    <span className='col mgt-10'>
                        <span>Câu hỏi: </span>
                        <TextArea rows={2} placeholder={props.data.content} onChange={enterQContent} />
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
        </li>
    )
}

export default QuestionItem;

