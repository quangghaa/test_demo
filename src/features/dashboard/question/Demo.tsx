import { FieldTimeOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { useState } from "react";
import { ITest } from "../../interface";

const Demo = () => {
    const [testItem, setTestItem] = useState([] as ITest[]);

    const [levelList, setLevelList] = useState([] as number[]);

    const [candidateCodeList, setCandidateCodeList] = useState([] as string[]);

    const onSave = () => {
        // const testCode = testItem.length > 0 ? testItem[0].codeTest : '';
        // if (testCode.length === 0) return;

        // const body = {
        //     candidates: reduxTest.candidates
        // }

        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body)
        // }
        // const fetchData = async () => {
        //     try {
        //         const upUrl = 'https://demo.uiza.vn/tests/' + '' + reduxTest.id;
        //         const res = await fetch(upUrl, requestOptions);
        //         const json = await res.json();

        //         setRes(json);
        //     } catch (error: any) {
        //         setErr(error);
        //     }
        // }
        // fetchData();
    }

    const onSelectAns = () => {
        console.log('x');
    }


    return (
        <>
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

        </>
    )
}

export default Demo;