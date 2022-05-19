import { UndoOutlined } from "@ant-design/icons";
import { Row, Col, Cascader, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const CodingTest = (props: any) => {
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

export default CodingTest;