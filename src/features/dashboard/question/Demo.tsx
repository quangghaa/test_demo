import { FieldTimeOutlined, CloseOutlined, CloseCircleOutlined, UserAddOutlined, CheckOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ITest } from "../../interface";
import { deleteQa, selectTest } from "../../reducer/testSlice";

const Demo = () => {

    const [candidateCodeList, setCandidateCodeList] = useState([
        'HA',
        'Linh',
        'Lam',
        'HA',
        'Linh',
        'Lam',
        'HA',
        'Linh',
        'Lam'
    ] as string[]);

    const disPatch = useAppDispatch();

    const test = useAppSelector(selectTest);

    const onRemoveQuestion = (q: any) => {
        disPatch(deleteQa(q));
    }

    const onSave = () => {

    }

    const mapABC = (i: any) => {
        switch(i) {
            case 0: return 'A';
            case 1: return 'B';
            case 2: return 'C';
            case 3: return 'D';
            case 4: return 'E';
            default: return 'X';
        }
    }


    return (
        <>
            <div className='sticky-sec col'>
                <span className='font'>Demo</span>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Tên bài test: </span>
                        <span>{test.name}</span>
                        <span className='row-center-y mgt-10'>
                            <FieldTimeOutlined className='big-time-ic' />
                            <span className='sm-box mgl-10'>{test.times}</span>
                        </span>
                    </Col>

                    <Col span={16} className='relative'>
                        <span>Tham gia test</span>
                        <span className="add-can"><UserAddOutlined /></span>
                        <div className="row">
                            <div className='lar-box mgt-10'>
                                <ul className='can-list'>
                                    {candidateCodeList.length > 0 ?
                                        candidateCodeList.map(code => (
                                            code != null ? <li>{code} <span className="rm-can-code"><CloseCircleOutlined className='mgl-5' /></span></li> : <></>
                                        ))
                                        :
                                        <></>
                                    }
                                </ul>
                            </div>
                            <Button className='btn-save mgl-30' onClick={onSave}>Lưu</Button>
                        </div>

                    </Col>
                </Row>


            </div>

            <ul className='demo-qs-list'>

                {/* {test.questions.map((q, i) => (
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
                )) : <></>} */}

                {test.questions.map((q: any, i: any) => {
                    return (
                        <li>
                            <span className="rm-question" onClick={() => onRemoveQuestion(q)}><CloseCircleOutlined /></span>
                            <span>{i + 1}.&nbsp;{q.content}</span>
                            <ul className='qs-ans-list'>
                                {q.multipleChoiceQuestions.length > 0 ? q.multipleChoiceQuestions.map((c: any, i: any) => (
                                    <li>
                                        {/* <Checkbox onChange={onSelectAns}>{c.answer}</Checkbox> */}
                                        {c.isTrue != 0 ? <span className="correct-ans"><CheckOutlined /></span> : <></>}
                                        <span>{mapABC(i)}.&nbsp;{c.answer}</span>
                                    </li>
                                ))

                                    : <></>}
                            </ul>
                            
                        </li>
                    )
                })}
            </ul>

        </>
    )
}

export default Demo;