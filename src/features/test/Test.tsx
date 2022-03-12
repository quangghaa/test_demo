import { UndoOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, Radio, Row, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import Header from '../header/Header';
import './Test.css';

const Question = (props: any) => {

    const [answer, setAnswer] = useState('');

    const onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        setAnswer(e.target.value);
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

    return (
        <li className='list-item mgt-20' key={props.id + 1}>
            <span className='qs-num'>Cau {props.id + 1}</span>
            <span className='qs'>{props.data.question}</span>
            <br></br>
            {
                props.data.type === 'write' ?
                    <TextArea rows={4} className='cus-mg' />
                    :
                    <Radio.Group onChange={onChange} value={answer} className='cus-mg'>
                        <Space direction="vertical">
                            {props.data.answer.map((ans: any, i: any) => (
                                <Radio value={mapAns(i + 1)}>{ans}</Radio>
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
            {props.data[0].eng.content.map((d: any, i: any) => (
                <Question id={i} data={d} />
            ))}
        </ul>
    )
}

const GeneralTest = (props: any) => {
    return (
        <ul className='list'>
            {props.data[0].gen.content.map((d: any, i: any) => (
                <Question id={i} data={d} />
            ))}
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
                            <Cascader size="large" options={options} onChange={onChange} className='mgr-20'/>
                            <UndoOutlined className='big-icon'/>
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

const Test = () => {
    const testData = [
        {
            eng: {
                title: 'English test',
                content: [
                    {
                        type: 'write',
                        question: 'English Question 1?',
                        answer: []
                    },
                    {
                        type: 'choose',
                        question: 'English Question 2?',
                        answer: [
                            'A. ', 'B.', 'C.', 'D.'
                        ]
                    },
                    {
                        type: 'choose',
                        question: 'English Question 3?',
                        answer: [
                            'A. ', 'B.', 'C.', 'D.'
                        ]
                    }
                ]
            },
            
            gen: {
                title: 'General test',
                content: [
                    {
                        type: 'write',
                        question: 'General Question 1?',
                        answer: []
                    },
                    {
                        type: 'choose',
                        question: 'General Question 2?',
                        answer: [
                            'A. ', 'B.', 'C.', 'D.'
                        ]
                    },
                    {
                        type: 'choose',
                        question: 'General Question 3?',
                        answer: [
                            'A. ', 'B.', 'C.', 'D.'
                        ]
                    }
                ]
            },

            code: {
                title: 'Code test',
                content: {
                    problem: {
                        title: 'Problem',
                        content: [
                            'There is a large pile of socks that must be paired by color.'
                        ]
                    },
                    example: {
                        title: 'Example',
                        content: ['n = 7', 'arr = [1, 2, 3, 1]'],
                        description: 'There is one pair of color 1 and one of color 2.'
                    },
                    function_description: {
                        title: 'Function Description',
                        content: [
                            'Complete the sockMerchant function in the editor below.'
                        ],
                        parameter: [
                            'int n: the number of socks in the pile',
                            'int arr[n]: the colors of each sock'
                        ]
                    },
                    returns: {
                        title: 'Returns',
                        content: [
                            'int: the number of pairs'
                        ]
                    },
                    input_format: {
                        title: 'Input Format',
                        content: [
                            'The first line contains an integer n, the number of socks represented in arr',
                            'The second line contains n space-seperated integers, arr[i], the colors of the socks in the pile.'
                        ]
                    },
                    constraints: {
                        title: 'Constraints',
                        content: [
                            '1 < n < 100',
                            '1 < arr[i] < 100 where 0 < i < n'
                        ]
                    },
                    sample_input: {
                        title: 'Sample Input',
                        content: [
                            '9',
                            '10 20 20 10 10 30 50 10 20'
                        ]
                    },
                    sample_output: {
                        title: 'Sample Output',
                        content: [
                            '3'
                        ]
                    },
                    explaination: {
                        title: 'Explaination',
                        content: []
                    }
                    
                }
            }
        }
    ]

    const [switchview, setSwitchview] = useState('ENG');

    const toEng = () => {
        setSwitchview('ENG');
        console.log("TO ENG");
    }

    const toGen = () => {
        setSwitchview('GEN');
        console.log("To gen");
    }

    const toCode = () => {
        setSwitchview('CODE');
        console.log("To code");
    }

    const renderView = (props: any) => {
        switch(switchview) {
            case 'ENG': return <EnglishTest data={props}/>;
            case 'GEN': return <GeneralTest data={props}/>
            case 'CODE': return <CodeTest data={props}/>;
            default: return <EnglishTest data={props}/>
        }
    }

    return (
        <div>
            <Header />
            <div className='fullscreen row pdt-50'>
                <ul className='nav'>
                    <li className='nav-item' onClick={toEng}><span className='vertical'>Tiếng anh</span></li>
                    <li className='nav-item' onClick={toGen}><span className='vertical'>Kiến thức chung</span></li>
                    <li className='nav-item' onClick={toCode}><span className='vertical'>Lập trình</span></li>
                </ul>

                <div className='cus-pd fullwidth'>
                    {renderView(testData)}
                </div>
            </div>

        </div>
    )
}

export default Test;