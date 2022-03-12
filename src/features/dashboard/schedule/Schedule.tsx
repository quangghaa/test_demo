import { CalendarOutlined, CloseOutlined, FileWordOutlined, FilterFilled, MailFilled, PhoneFilled, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, DatePicker, Input, Row } from 'antd';
import { useState } from 'react';
import HeaderD from '../headerD/HeaderD';
import './Schedule.css';

const upcommingCansData = [
    {
        date: '18/03/2022',
        candidates: [
            {
                code: 'BC0001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC0002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            }
        ]
    },
    {
        date: '16/03/2022',
        candidates: [
            {
                code: 'BC0001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC0002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            }
        ]
    },
]

const todayCansData = [
    {
        date: '10/03/2022',
        candidates: [
            {
                code: 'BC1001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC1002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            }
        ]
    }
]

const outdateCansData = [
    {
        date: '08/03/2022',
        candidates: [
            {
                code: 'BC0001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC0002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            }
        ]
    },
    {
        date: '06/03/2022',
        candidates: [
            {
                code: 'BC0001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC0002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            }
        ]
    }
]

const calendarData = [
    {
        date: '10/03/2022',
        candidates: [
            {
                code: 'BC1001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC1002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            }
        ]
    },
    {
        date: '18/03/2022',
        candidates: [
            {
                code: 'BC0001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC0002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            }
        ]
    },
    {
        date: '16/03/2022',
        candidates: [
            {
                code: 'BC0001',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '7:30'
            },
            {
                code: 'BC0002',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Frontend',
                level: 'middle',
                reporter: 'Quang Ha',
                time: '10:30'
            },
            {
                code: 'BC0003',
                name: 'Nguyen Van A',
                department: 'P.CN Blockchain',
                position: 'Backend',
                level: 'Junior',
                reporter: 'Quang Ha',
                time: '14:30'
            }
        ]
    }
]

const CandidateCard = (props: any) => {
    return (
        <li key={props.data.code} className='mgt-20'>
            <div className='c-card col'>
                <div className='row-between c-h'>
                    <span>{props.data.name}</span>
                    <span>
                        <span className='mgr-10'>Edit</span>
                        <span><CloseOutlined /></span>
                    </span>
                </div>

                <span>
                    <span className='bold'>Code: </span>
                    {props.data.code}
                </span>

                <span>
                    <span className='bold'>Phòng ban: </span>
                    {props.data.department}
                </span>

                <span>
                    <span className='bold'>Vị trí: </span>
                    {props.data.position}
                </span>

                <span>
                    <span className='bold'>Level: </span>
                    {props.data.level}
                </span>

                <span>
                    <span className='bold'>Reporter: </span>
                    {props.data.reporter}
                </span>

                <div className='center'>
                    <span className='c-time'>
                        <CalendarOutlined className='mgr-10'/>
                        <span className='mgr-10'>{props.data.time}</span>
                        <span>{props.date}</span>
                    </span>
                </div>
            </div>
        </li>
    )
}

const ScheduleSection = () => {
    return (
        <Row gutter={8}>
            <Col span={8}>
                <div className='pd-20'>
                    <span>Sắp tới</span>
                    <ul className='c-cans'>
                        {upcommingCansData.map((up: any) => (
                            up.candidates.map((c: any) => (
                                <CandidateCard data={c} date={up.date} />
                            ))
                        ))}
                    </ul>
                </div>
            </Col>

            <Col span={8}>
                <div className='pd-20'>
                    <span>Hôm nay</span>
                    <ul className='c-cans'>
                        {todayCansData.map((up: any) => (
                            up.candidates.map((c: any) => (
                                <CandidateCard data={c} date={up.date} />
                            ))
                        ))}
                    </ul>
                </div>
            </Col>

            <Col span={8}>
                <div className='pd-20'>
                    <span>Quá hạn</span>
                    <ul className='c-cans'>
                        {outdateCansData.map((up: any) => (
                            up.candidates.map((c: any) => (
                                <CandidateCard data={c} date={up.date} />
                            ))
                        ))}
                    </ul>
                </div>
            </Col>
        </Row>
    )
}

const CalendarSection = () => {
    return (
        <div>
            {calendarData.map((cal: any) => (
                <div className='col mgt-20'>
                    <span className='cal-date'>{cal.date}</span>
                    <ul className='c-cal'>
                        {cal.candidates.map((c: any) => (
                            <CandidateCard data={c} date={cal.date} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

const Schedule = () => {
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

    function onChange(value: any) {
        console.log(value);
    }

    const [sw, setSw] = useState({
        schedule: true,
        calendar: false
    });

    const scheduleClick = () => {
        console.log('Schedule click');
        setSw({
            schedule: true,
            calendar: false
        })
    }

    const calendarClick = () => {
        console.log('Schedule click');
        setSw({
            schedule: false,
            calendar: true
        })
    }

    return (
        <div className='pdt-50'>
            <HeaderD />
            <Row>
                <Col span={6} className='pd-20'>
                    <div className='bdr col pdr-20'>
                        <span className='filter'><FilterFilled className='mgr-20' />Bộ lọc</span>
                        <span className='mgt-20'>Tên</span>
                        <div className='name-inp'>
                            <Input size="large" placeholder="large size" />
                            <span className='name-inp-ic'><UserOutlined /></span>
                        </div>

                        <span className='mgt-10'>Phòng ban</span>
                        <Cascader className='c-cas' size='large' options={options} onChange={onChange} placeholder="Please select" />

                        <span className='mgt-10'>Vị trí</span>
                        <span className='border'>
                            <br />
                        </span>
                        <ul className='level-list'>
                            <li>Fresher</li>
                            <li>Junior</li>
                            <li>Senior</li>
                        </ul>
                        <div className='row-between mgt-10'>
                            <div className='col'>
                                <span>Lịch</span>
                                <DatePicker onChange={onChange} />
                            </div>
                            <div id='contact' className='col mgl-20'>
                                <span>Liên hệ</span>
                                <Input size="small" placeholder="Email" prefix={<MailFilled />} />
                                <Input className='mgt-10' size="small" placeholder="Phone number" prefix={<PhoneFilled />} />
                            </div>
                        </div>
                        <span className='center mgt-30'>
                            <Button className='btn-search' icon={<SearchOutlined />}>
                                Tìm
                            </Button>
                            <Button className='btn-add' icon={<PlusOutlined />}>
                                Thêm
                            </Button>
                        </span>
                        <span className='center mgt-20'>
                            <Button className='btn-delete' icon={<CloseOutlined />}>
                                Xóa lọc
                            </Button>
                        </span>
                    </div>
                </Col>
                <Col span={18} className='pd-20'>
                    <span>
                        <span className='filter'><FileWordOutlined className='mgr-20' />Danh sách</span>
                        <Checkbox className='mgl-30' checked={sw.schedule} onChange={scheduleClick}>Bảng</Checkbox>
                        <Checkbox className='mgl-30' checked={sw.calendar} onChange={calendarClick}>Lịch</Checkbox>
                    </span>
                    {sw.schedule ? <ScheduleSection /> : <></>}
                    {sw.calendar ? <CalendarSection /> : <></>}
                </Col>
            </Row>

        </div>
    )
}

export default Schedule;