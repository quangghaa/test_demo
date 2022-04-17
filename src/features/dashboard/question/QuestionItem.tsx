import { PlusOutlined, CloseCircleFilled, CheckSquareFilled, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useState, useEffect } from "react";
import { IQA, ITest } from "../../interface";
import { deleteQa } from "../../reducer/testSlice";

const QuestionItem = (props: any) => {
    const [testItem, setTestItem] = useState([] as ITest[]);

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

            // dispatch(deleteQa(ind));

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

export default QuestionItem;
