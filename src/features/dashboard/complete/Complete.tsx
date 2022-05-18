import { CloseOutlined, SearchOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, Row, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { getList } from '../../../services/api';
import { ICandidate } from '../../interface';
import HeaderD from '../headerD/HeaderD';
import './Complete.css';


const Complete = () => {
    const pos = [
        {
            value: 'Developer',
            label: 'Developer'
        },
        {
            value: 'PM',
            label: 'PM'
        }
    ];

    const lev = [
        {
            value: '1',
            label: 'Intern'
        },
        {
            value: '2',
            label: 'Freshser'
        },
        {
            value: '3',
            label: 'Junior'
        }
    ];

    const options = [
        {
            value: 'blockchain',
            label: 'Blockchain',
            children: []
        },
        {
            value: 'database',
            label: 'Database',
            children: [],
        },
    ];

    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listDone, setListDone] = useState([] as ICandidate[]);


    useEffect(() => {
        const getDone = async () => {
            try {
                setLoading(true);
                const res = await getList('staff/candidate/done');
                if (res && res.data != null) {
                    setListDone(res.data);
                    console.log(listDone, "-------")
                }
            } finally {
                setLoading(false);
            }
        }

        getDone();
    }, [reload]);

    function onChange(value: any) {
        console.log(value);
    }

    const onSelectPos = (value: any) => {
        // setSearchBody({ ...searchBody, position: value[0] })
    }

    const onSelectLev = (value: any) => {
        // const obj = {
        //     id: value[0]
        // }
        // setSearchBody({ ...searchBody, level: value })
    }


    return (
        <div className='pdt-50'>
            <HeaderD />
            <Row>
                <Col span={6} className='pd-20'>
                    <div className='col pdr-20'>

                        <span className='mgt-20'>Tên</span>
                        <div className='name-inp'>
                            <Input size="large" placeholder="large size" />
                            <span className='name-inp-ic'><UserOutlined /></span>
                        </div>

                        <span className='mgt-10'>Phòng ban</span>
                        <Cascader className='c-cas' size='large' options={options} onChange={onChange} placeholder="Please select" />

                        <span className='mgt-10'>Vị trí</span>
                        <Cascader className='c-cas' size='large' options={pos} onChange={onSelectPos} placeholder="Which position?" />

                        <span className='mgt-10'>Level</span>
                        <Cascader className='c-cas' size='large' options={lev} onChange={onSelectLev} placeholder="Which level?" />

                        <span className='center mgt-30'>
                            <Button className='btn-search' icon={<SearchOutlined />}>
                                Tìm
                            </Button>
                            <Button className='btn-delete' icon={<CloseOutlined />}>
                                Xóa lọc
                            </Button>
                        </span>
                    </div>
                </Col>
                <Col span={18} className='pd-20'>
                    <ul className='com-test-list'>
                        {listDone.map((c) => (
                            <li>
                                <div className='left'>
                                    <div className='cans-info'>
                                        <span className='cans-name'>{c.name}</span>
                                        {/* <span className='mgt-10'><b>Phòng ban:&nbsp;</b>{c.department}</span> */}
                                        <span><b>Vị trí:&nbsp;</b>{c.position}</span>
                                        <span><b>Level:&nbsp;</b>{c.level != null ? c.level.name : ""}</span>
                                        <span><b>Người thêm:&nbsp;</b>{c.reporter}</span>
                                        {/* <span className='row mgt-10'><b>Điểm:&nbsp;</b><Input className='com-inp' placeholder=''></Input></span> */}

                                        <b>Điểm ngoại ngữ:&nbsp;</b>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#bae7ff',
                                                '100%': '#87d068',
                                            }}
                                            percent={c.englishMark || 0}></Progress>
                                        <b>Điểm kiến thức chung:&nbsp;</b>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#bae7ff',
                                                '100%': '#87d068',
                                            }}
                                            percent={c.knowledgeMark || 0}></Progress>
                                        <b>Điểm coding:&nbsp;</b>
                                        <Progress
                                            strokeColor={{
                                                '0%': '#bae7ff',
                                                '100%': '#87d068',
                                            }}
                                            percent={c.codingMark || 0}></Progress>
                                    </div>

                                    <div className='chart'>
                                        {/* Chart */}
                                    </div>
                                </div>

                                <div className='right'>
                                    <span>
                                        <Checkbox onChange={onChange}>SMS</Checkbox>
                                        <span>Gửi điểm <SendOutlined /></span>
                                    </span>
                                    <span><Checkbox onChange={onChange}>Email</Checkbox></span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>

        </div >
    )
}

export default Complete;