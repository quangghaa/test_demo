import { PlusOutlined, CloseCircleFilled, CheckSquareFilled, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Checkbox, Modal } from "antd";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteOne } from "../../../services/api";
import { IQA, ITest } from "../../interface";
import testSlice, { addQa, selectTest } from "../../reducer/testSlice";

const QuestionItem = (props: any) => {
    const [testItem, setTestItem] = useState([] as ITest[]);

    const [detail, setDetail] = useState({
        index: '',
        state: false
    });

    const [visibleConfirm, setVisibleConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const test = useAppSelector(selectTest);

    const showConfirm = (e: any) => {
        e.stopPropagation();

        setVisibleConfirm(true);
    }

    const onYes = async (id: any) => {
        try {
            setLoading(true);
            const res = await deleteOne('staff/deletequestion', id);
            if(res) {

                setVisibleConfirm(false);
                props.reload();
            }

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
        console.log(props.data);
        let isHad = false;
        test.questions.map(q => {
            if(q.id == id) isHad = true;
        })

        if(isHad) {
            console.log("Already added");
        } else {
            dispatch(addQa(props.data));
        }
        
    }

    const mapABC = (i: any) => {
        switch(i) {
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
                                <li>{mapABC(i)}.&nbsp;{c.answer}</li>
                            ))}
                        </ul>
                        <span className='row-between mgt-10 pd-x-20'>
                            <span onClick={onEdit}>Edit</span>
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
        </li>
    )
}

export default QuestionItem;

