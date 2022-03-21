import { PropertySafetyFilled, UndoOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, Radio, Row, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Header from '../header/Header';
import { IChosen, IQA } from '../interface';
import { addAnswer, addCache, Answer, selectCacheAnswer } from '../reducer/cacheAnswerSlice';
import { selectListTest } from '../reducer/listTestSlice';
import './Test.css';

const Question = (props: any) => {
    const [answer, setAnswer] = useState('');

    const dispatch = useAppDispatch();
    const cache = useAppSelector(selectCacheAnswer);

    console.log('cache: ', cache);

    const onChange = (e: any, id: any) => {
        console.log("CHOSE: ", e.target.value);
        setAnswer(e.target.value);

        if(cache.length > 0) {
            const x = cache.filter((value: any) => {
                return value
            })
        }
        dispatch(addAnswer)
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

    return (
        <li className='list-item mgt-20' key={props.data.id}>
            <span className='qs-num'>Cau {props.data.id}</span>
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

const EnglishTest = (props: any) => {

    return (
        <ul className='list'>
            {Array.isArray(props.data) && props.data.length > 0 ?
                props.data.map((qa: IQA) => (
                    <Question id={qa.id} data={qa} type={props.type} />
                )) : <></>
            }
        </ul>
    )
}

const GeneralTest = (props: any) => {
    return (
        <ul className='list'>
            {Array.isArray(props.data) && props.data.length > 0 ?
                props.data.map((qa: IQA) => (
                    <Question id={qa.id} data={qa} type={props.type} />
                )) : <></>
            }
        </ul>
    )
}

const CodeTest = (props: any) => {
    const { problem, example, function_description, returns, input_format, constraints, sample_input, sample_output, explaination } = props.data[0].code.content

    const options = [
        {
            value: 'java',
            label: 'Java',
            children: [
            ],
        },
        {
            value: 'golang',
            label: 'Golang',
            children: [
            ],
        },
    ];

    function onChange(value: any) {
        console.log(value);
    }

    return (
        <div >
            <Row gutter={8}>
                <Col span={8} className="col bdr">
                    <b>{problem.title}</b>
                    {problem.content.map((c: any) => (
                        <p>{c}</p>
                    ))}

                    <b>{example.title}</b>
                    <ul>
                        {example.content.map((e: any) => (
                            <li>{e}</li>
                        ))}
                    </ul>
                    <p>{example.description}</p>

                    <b>{function_description.title}</b>
                    {function_description.content.map((f: any) => (
                        <p>{f}</p>
                    ))}
                    <ul>
                        {function_description.parameter.map((p: any) => (
                            <li>{p}</li>
                        ))}
                    </ul>

                    <b>{returns.title}</b>
                    <ul>
                        {returns.content.map((r: any) => (
                            <li>{r}</li>
                        ))}
                    </ul>

                    <b>{input_format.title}</b>
                    <ul className='inp-list'>
                        {input_format.content.map((i: any) => (
                            <li>{i}</li>
                        ))}
                    </ul>

                    <b>{constraints.title}</b>
                    <ul>
                        {constraints.content.map((c: any) => (
                            <li>{c}</li>
                        ))}
                    </ul>

                    <b>{sample_input.title}</b>
                    <ul className='bg-lightpink'>
                        {sample_input.content.map((s: any) => (
                            <li>{s}</li>
                        ))}
                    </ul>

                    <b>{sample_output.title}</b>
                    <ul className='bg-lightpink'>
                        {sample_output.content.map((s: any) => (
                            <li>{s}</li>
                        ))}
                    </ul>
                    <b>{explaination.title}</b>
                </Col>

                <Col span={16}>
                    <div className='code-sec'>
                        <span className='select-lang'>
                            <Cascader size="large" options={options} onChange={onChange} className='mgr-20' />
                            <UndoOutlined className='big-icon' />
                        </span>
                        <TextArea rows={22} />
                    </div>
                    <div className='row-reverse mgt-20'>

                        <Button className='btn-sub'>Submit code</Button>
                        <Button className='btn-run'>Run code</Button>
                    </div>

                    <div className='mgt-20'>
                        <span>Result Section ...</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}


const Test = (props: any) => {

    const listTest = useAppSelector(selectListTest);

    const [switchview, setSwitchview] = useState('ENG');

    const toEng = () => {
        setSwitchview('ENG');
    }

    const toGen = () => {
        setSwitchview('GEN');
    }

    const toCode = () => {
        setSwitchview('CODE');
    }

    const renderView = (props: any) => {
        let eng = [] as IQA[];
        let gen = [] as IQA[];
        if (Array.isArray(props) && props.length > 0) {
            props.map(t => {
                if (t.type === 'ENG' || t.subject === 1) {
                    eng = t.questions;
                } else if (t.type === 'GEN' || t.subject === 3) {
                    gen = t.questions;
                }
            })
        }

        switch (switchview) {
            case 'ENG': return <EnglishTest data={eng} finish={props.finish} type={switchview} />
            case 'GEN': return <GeneralTest data={gen} finish={props.finish} type={switchview} />
            default: return <EnglishTest data={eng} finish={props.finish} type={switchview} />
        }
    }

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(listTest.length > 0) {
            listTest.map((t) => {
                dispatch(addCache({
                    testId: t.id,
                    type: t.type,
                    ans: [] as Answer[]
                }));
                console.log('In a map: ', t);
            })
        }
    }, []);



    return (
        <div>
            <Header start={props.start} finish={props.finish} />
            <div className='fullscreen row pdt-50'>
                <ul className='nav'>
                    <li className='nav-item' onClick={toEng}><span className='vertical'>Tiếng anh</span></li>
                    <li className='nav-item' onClick={toGen}><span className='vertical'>Kiến thức chung</span></li>
                    <li className='nav-item' onClick={toCode}><span className='vertical'>Lập trình</span></li>
                </ul>

                <div className='cus-pd fullwidth'>
                    {renderView(listTest)}
                </div>
            </div>

        </div>
    )
}

export default Test;


