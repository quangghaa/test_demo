import { CloseOutlined, FileWordOutlined, FilterFilled, MailFilled, PhoneFilled, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, DatePicker, Input, Row } from 'antd';
import { useState } from 'react';
import { ICalendar, ICandidate } from '../../interface';
import HeaderD from '../headerD/HeaderD';
import CalendarSection from './CalendarSection';
import './Schedule.css';
import ScheduleSection from './ScheduleSection';

const Schedule = () => {
    const dep = [
        {
            value: 'Blockchain',
            label: 'Blockchain'
        },
        {
            value: 'database',
            label: 'Database'
        }
    ];

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
            value: 'Junior',
            label: 'Junior'
        },
        {
            value: 'Middle',
            label: 'Middle'
        },
        {
            value: 'Senior',
            label: 'Senior'
        }
    ];

    const enterName = (e: any) => {
        
    } 

    const onSelectDep = (value: any) => {

    }

    const onSelectPos = (value: any) => {
        
    }

    const onSelectLev = (value: any) => {
        
    }

    const onSelectTime = (value: any) => {
        
    }

    const onSearch = () => {

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

    const [today, setToday] = useState([] as ICandidate[]);
    const [future, setFuture] = useState([] as ICandidate[]);
    const [past, setPast] = useState([] as ICandidate[]);

    const [calList, setCalList] = useState([] as ICalendar[]);
    ///////

    return (
        <div className='pdt-50'>
            <HeaderD />
            <Row>
                <Col span={6} className='pd-20'>
                    <div className='bdr col pdr-20'>
                        <span className='filter'><FilterFilled className='mgr-20' />Bộ lọc</span>
                        <span className='mgt-20'>Tên</span>
                        <div className='name-inp'>
                            <Input size="large" placeholder="Enter name" onChange={enterName} />
                            <span className='name-inp-ic'><UserOutlined /></span>
                        </div>

                        <span className='mgt-10'>Phòng ban</span>
                        <Cascader className='c-cas' size='large' options={dep} onChange={onSelectDep} placeholder="Which department?" />

                        <span className='mgt-10'>Vị trí</span>
                        <Cascader className='c-cas' size='large' options={pos} onChange={onSelectPos} placeholder="Which position?" />

                        <span className='mgt-10'>Level</span>
                        <Cascader className='c-cas' size='large' options={lev} onChange={onSelectLev} placeholder="Which level?" />
                        
                        <div className='row-between mgt-10'>
                            <div className='col'>
                                <span>Lịch</span>
                                <DatePicker onChange={onSelectTime} />
                            </div>
                            <div id='contact' className='col mgl-20'>
                                <span>Liên hệ</span>
                                <Input size="small" placeholder="Email" prefix={<MailFilled />} />
                                <Input className='mgt-10' size="small" placeholder="Phone number" prefix={<PhoneFilled />} />
                            </div>
                        </div>
                        <span className='center mgt-30'>
                            <Button className='btn-search' onClick={onSearch} icon={<SearchOutlined />}>
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
                    {sw.schedule ? <ScheduleSection fu={future} to={today} pa={past} /> : <></>}
                    {sw.calendar ? <CalendarSection list={calList} /> : <></>}
                </Col>
            </Row>

        </div>
    )
}

export default Schedule;