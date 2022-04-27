import { Radio, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { createOne } from "../../services/api";

const Question = (props: any) => {
    const [answer, setAnswer] = useState('');
    console.log("PROPPSSSS: ", props);

    useEffect(() => {
        const cacheData = props.cache;
        const data = props.data;

        if(Array.isArray(cacheData) && cacheData.length > 0) {
            cacheData.map((cache) => {
                const arr = cache.key.split(':');
                if(Array.isArray(arr) && arr.length > 0) {
                    // console.log("Split OKE: ", arr);
                    // console.log("----", arr[0], props.data.id, props.id);
                    if(arr[0] == props.data.id) {
                        // console.log("SPLIT OKE and EQUAL");
                        setAnswer(cache.value.idAnswer);
                    }

                } else {
                    // console.log("SPLIT ERROR");
                }
            })
        } else {
            // console.log("Not array cache data");
        }

    }, [props.cache])

    const onChange = (e: any, id: any) => {
        // console.log("CHOSE: ", e.target.value);
        setAnswer(e.target.value);

        let body = {
            idAnswer: parseInt(e.target.value),
            idTest: parseInt(props.testId)

        }

        const doingTest = async () => {
            try {
                const res = await createOne(`testpage/doingtest/${props.id}`, body);
                if(res) {
                    console.log("DOOO: ", res.data);
                }
            } finally {
                console.log("");
            }
        }

        doingTest();
    };

    const mapAns = (ans: any) => {
        switch (ans) {
            case 1: return 'A';
            case 2: return 'B';
            case 3: return 'C';
            case 4: return 'D';
            case 5: return 'E';
            default: return 'Unknown';
        }
    }

    const mapType = (type: string) => {
        switch(type) {
            case 'ENG': return 1;
            case 'GEN': return 2;
            default : return 9;
        }
    }

    const renderTitle = (type: any) => {
        switch(type) {
            case 'ENG': return <span className='qs-num'>Question {props.index}</span>
            case 'GEN': return <span className='qs-num'>Câu {props.index}</span>
            default: <span className='qs-num'> :( {props.index}</span>
        }
    }

    return (
        <li className='list-item mgt-20' key={props.data.id}>
            {renderTitle(props.type)}
            <span className='qs'>{props.data.content}</span>
            <br></br>
            {
                props.data.type === 'w' ?
                    <TextArea rows={4} className='cus-mg' />
                    :
                    <Radio.Group onChange={(e) => onChange(e, props.data.id)} value={answer} className='cus-mg'>
                        <Space direction="vertical">
                            {props.data.multipleChoiceQuestions.map((ans: any, i: any) => (
                                <Radio key={i} value={ans.id}>{ans.answer}</Radio>
                            ))}
                        </Space>
                    </Radio.Group>
            }
        </li>
    )
}

export default Question;