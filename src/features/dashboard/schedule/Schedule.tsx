import { CloseOutlined, FileWordOutlined, FilterFilled, MailFilled, PhoneFilled, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, DatePicker, Input, Modal, Row, TimePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { createContentType } from '../../../hooks/useContentType';
import { createOne } from '../../../services/api';
import { ICalendar, ICandidate, ICandidateBody } from '../../interface';
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

    const testValue = {
        value: 'Blockchain',
        label: 'Blockchain'
    }

    const [today, setToday] = useState([] as ICandidate[]);
    const [future, setFuture] = useState([] as ICandidate[]);
    const [past, setPast] = useState([] as ICandidate[]);

    const [calList, setCalList] = useState([] as ICalendar[]);

    const [visibleModal, setVisibleModal] = useState(false)

    const [loadingModal, setLoadingModal] = useState(false)

    const [searchBody, setSearchBody] = useState({
        name: '',
        department: '',
        position: '',
        level: '',
        date: '',
        time: '',
        phone: '',
        email: ''
    } as ICandidateBody)

    const [addBody, setAddBody] = useState({
        name: '',
        department: '',
        position: '',
        level: '',
        date: '',
        time: '',
        phone: '',
        email: ''
    } as ICandidateBody)

    const enterName = (e: any) => {
        setSearchBody({...searchBody, name: e.target.value})
    }

    const onSelectDep = (value: any) => {
        setSearchBody({...searchBody, department: value})
    }

    const onSelectPos = (value: any) => {
        setSearchBody({...searchBody, position: value})
    }

    const onSelectLev = (value: any) => {
        setSearchBody({...searchBody, level: value})
    }

    const onSelectDate = (value: any) => {
        const selectDate = new Date(value);
        setSearchBody({...searchBody, date: selectDate.toString()})
    }

    const onSelectTime = (value: any) => {
        const selectTime = new Date(value)
        setSearchBody({...searchBody, time: selectTime.toString()})
    }

    const enterEmail = (e: any) => {
        setSearchBody({...searchBody, email: e.target.value})
    }

    const enterPhone = (e: any) => {
        setSearchBody({...searchBody, phone: e.target.value})
    }

    const onSearch = () => {

    }

    const enterNameModal = (e: any) => {
        setAddBody({...addBody, name: e.target.value})
    }

    const onSelectDepModal = (value: any) => {
        setAddBody({...addBody, department: value})
    }

    const onSelectPosModal = (value: any) => {
        setAddBody({...addBody, position: value})
    }

    const onSelectLevModal = (value: any) => {
        setAddBody({...addBody, level: value})
    }

    const onSelectDateModal = (value: any) => {
        setAddBody({...addBody, date: new Date(value).toString()})
    }

    const onSelectTimeModal = (value: any) => {
        setAddBody({...addBody, time: new Date(value).toString()})
    }

    const enterEmailModal = (e: any) => {
        setSearchBody({...addBody, email: e.target.value})
    }

    const enterPhoneModal = (e: any) => {
        setSearchBody({...addBody, phone: e.target.value})
    }

    const onShowModal = () => {
        setVisibleModal(true);
    }

    const onSaveModal = async () => {
        setLoadingModal(true)

        const res = await createOne("addCandidate", addBody);
        // console.log("???", res);
        if(res) {
            setLoadingModal(false)
        }

        const reset = {
            name: '',
            department: '',
            position: '',
            level: '',
            date: '',
            time: '',
            phone: '',
            email: ''
        }
        setAddBody(reset)

        setVisibleModal(false)
    }

    const onCancelModal = () => {
        setVisibleModal(false);
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
                                <DatePicker onChange={onSelectDate} />
                                <TimePicker className='mgt-10' onChange={onSelectTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                            </div>
                            <div id='contact' className='col mgl-20'>
                                <span>Liên hệ</span>
                                <Input size="small" placeholder="Email" onChange={enterEmail} prefix={<MailFilled />} />
                                <Input className='mgt-10' size="small" placeholder="Phone number" onChange={enterPhone} prefix={<PhoneFilled />} />
                            </div>
                        </div>
                        <span className='center mgt-30'>
                            <Button className='btn-search' onClick={onSearch} icon={<SearchOutlined />}>
                                Tìm
                            </Button>
                            <Button className='btn-add' icon={<PlusOutlined />} onClick={onShowModal}>
                                Thêm
                            </Button>
                        </span>
                        <span className='center mgt-20'>
                            <Button className='btn-delete' icon={<CloseOutlined />}>
                                Xóa lọc
                            </Button>
                        </span>

                        <Modal
                            title='Thêm ứng viên'
                            visible={visibleModal}
                            // confirmLoading={confirmLoading}
                            onCancel={onCancelModal}
                            className="create-form"
                            footer={[
                                <div className='col'>
                                    <div className='center'>
                                        <Button key="submit" onClick={onSaveModal} className='btn-login' loading={loadingModal}>
                                            Lưu
                                        </Button>

                                        <Button key="cancel" onClick={onCancelModal} className='btn-login'>
                                            Hủy
                                        </Button>
                                    </div>
                                </div>
                                ,
                            ]}
                        >
                            <div className='col'>
                                <span className='mgt-20'>Tên</span>
                                <div className='name-inp'>
                                    <Input size="large" placeholder="Enter name" onChange={enterNameModal} />
                                    <span className='name-inp-ic'><UserOutlined /></span>
                                </div>

                                <span className='mgt-10'>Phòng ban</span>
                                <Cascader value={'Block' as any} className='c-cas' size='large' options={dep} onChange={onSelectDepModal} placeholder="Which department?" />

                                <span className='mgt-10'>Vị trí</span>
                                <Cascader className='c-cas' size='large' options={pos} onChange={onSelectPosModal} placeholder="Which position?" />

                                <span className='mgt-10'>Level</span>
                                <Cascader className='c-cas' size='large' options={lev} onChange={onSelectLevModal} placeholder="Which level?" />

                                <div className='row-between mgt-10'>
                                    <div className='col'>
                                        <span>Lịch</span>
                                        <DatePicker onChange={onSelectDateModal} />
                                        <TimePicker className='mgt-10' onChange={onSelectTimeModal} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                                    </div>
                                    <div id='contact' className='col mgl-20'>
                                        <span>Liên hệ</span>
                                        <Input size="small" onChange={enterEmailModal} placeholder="Email" prefix={<MailFilled />} />
                                        <Input className='mgt-10' onChange={enterPhoneModal} size="small" placeholder="Phone number" prefix={<PhoneFilled />} />
                                    </div>
                                </div>

                            </div>

                        </Modal>
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