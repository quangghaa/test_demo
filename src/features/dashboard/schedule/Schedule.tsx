import { CalendarOutlined, CloseOutlined, FileWordOutlined, FilterFilled, MailFilled, PhoneFilled, PlusOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, DatePicker, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import useFetch from '../../../hook/useFetch';
import { ICalendar, ICandidate } from '../../interface';
import { addCandidate, selectTest } from '../../reducer/testSlice';
import HeaderD from '../headerD/HeaderD';
import './Schedule.css';

const CandidateCard = (props: any) => {

    const [showoptions, setShowoptions] = useState(1);

    const isOdd = (n: number) => {
        if(n % 2 !== 0) return true;
        return false;
    }

    const openOptions = () => {
        setShowoptions(showoptions => showoptions + 1);
    }

    const Options = (props: any) => {
        const dispatch = useAppDispatch();
        const test = useAppSelector(selectTest);

        const onSetupTest = () => {
            
            if(!test.candidates.includes(props.data)) dispatch(addCandidate(props.data));
        }

        return (
                <ul id='ol' className='option-list' style={{display: isOdd(showoptions) ? 'none' : ''}}>
                    <li>Chọn</li>
                    <li>Gửi code</li>
                    <li>Xem liên hệ</li>
                    <li onClick={onSetupTest}>
                        <Link to='/dashboard/question'>Thiết lập bài test</Link>
                    </li>
                    <li >Chỉnh sửa thông tin</li>
                    <li>Xóa ứng viên</li>
                </ul>
        )
    }

    return (
        <li id='opstion-parent' key={props.data.code} className='mgt-20' onClick={openOptions}>
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
                        <CalendarOutlined className='mgr-10' />
                        <span>{props.data.dates}</span>
                    </span>
                </div>
            </div>
            <Options data={props.data} id={props.data.code}/>
        </li>
    )
}

const ScheduleSection = (props: any) => {
    return (
        <Row gutter={8}>
            <Col span={8}>
                <div className='pd-20'>
                    <span>Sắp tới</span>
                    <ul className='c-cans'>
                        {props.fu.length > 0 ? props.fu.map((up: any) => (
                            <CandidateCard data={up} />
                        )
                        ) : <></>}
                    </ul>
                </div>
            </Col>

            <Col span={8}>
                <div className='pd-20'>
                    <span>Hôm nay</span>
                    <ul className='c-cans'>
                        {props.to.length > 0 ? props.to.map((to: any) => (
                            <CandidateCard data={to} />
                        )) : <></>}
                    </ul>
                </div>
            </Col>

            <Col span={8}>
                <div className='pd-20'>
                    <span>Quá hạn</span>
                    <ul className='c-cans'>
                        {props.pa.length > 0 ? props.pa.map((pa: any) => (
                            <CandidateCard data={pa} />
                        )) : <></>}
                    </ul>
                </div>
            </Col>
        </Row>
    )
}

const CalendarSection = (props: any) => {
    return (
        <div>
            {props.list.map((cal: any) => (
                <div className='col mgt-20'>
                    <span className='cal-date'>{cal.date}</span>
                    <ul className='c-cal'>
                        {cal.cans.map((c: any) => (
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
            value: 'Blockchain',
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

    const [inputseacrh, setInputsearch] = useState({
        name: '',
        department: '',
        level: '',
        date: '',
        time: ''
    });

    const [isSearching, setIsSearching] = useState(false);

    const handleInputName = (e: any) => {
        // console.log(e.target.value);
        let t = { ...inputseacrh };
        t.name = e.target.value;
        setInputsearch(t);
        // console.log("Test: ", inputseacrh);
    }

    const handleSelectDepartment = (value: any) => {
        console.log(value);
        const t = { ...inputseacrh };
        if (Array.isArray(value) && value.length > 0) {
            t.department = value[0];
            setInputsearch(t);
        }

    }

    const genLevelList = ['Fresher', 'Junior', 'Senior'];

    const handleLevelClick = (l: any) => {
        console.log(l);

        const li = document.getElementsByClassName('mark-lv');

        if (li != null) {
            const ar = Array.from(li);
            ar.forEach((el: any) => {
                el.style.color = 'black';
                el.style.backgroundColor = 'white';
            })
        }

        const el = document.getElementById(l);

        if (el != null) {
            el.style.color = 'white';
            el.style.backgroundColor = 'black';
        }

        const t = { ...inputseacrh };
        t.level = l;
        setInputsearch(t);
    }

    const [today, setToday] = useState([] as ICandidate[]);
    const [future, setFuture] = useState([] as ICandidate[]);
    const [past, setPast] = useState([] as ICandidate[]);

    const [calList, setCalList] = useState([] as ICalendar[]);

    const classify = (rs: ICandidate[]) => {

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var t = now.getFullYear() + "-" + (month) + "-" + (day);

        var today = new Date(t);

        let to = [] as ICandidate[];
        let fu = [] as ICandidate[];
        let pa = [] as ICandidate[];

        let cal = [] as ICalendar[];

        let dateList = [] as string[];
        if (sw.schedule) {
            rs.forEach(i => {
                // let x = new Date(i.date);
                const arr = i.dates.split(' ');
                console.log('TIME: ', arr);
                let x = new Date(arr[0]);
                if (x > today) {
                    fu.push(i);
                }
                else if (x < today) {
                    pa.push(i);
                }
                else if (x.toISOString === today.toISOString) {
                    to.push(i);
                }
            })
            setFuture(fu);
            setToday(to);
            setPast(pa);
        }

        else {
            if (sw.calendar) {
                // Find all date from now
                rs.forEach((c) => {
                    const arr = c.dates.split(' ');
                    const t = arr[0];
                    const date = new Date(t);
                    if (date >= today) {
                        if (!dateList.includes(t)) dateList.push(t);
                    }

                })

                dateList.forEach((d) => {
                    const date = new Date(d);
                    console.log("A: ", date);
                    let canList = [] as ICandidate[];
                    rs.forEach((c) => {
                        const arr = c.dates.split(' ');

                        const cDate = new Date(arr[0]);
                        console.log("B: ", cDate);
                        if (cDate.toISOString() === date.toISOString()) {
                            console.log("X");
                            canList.push(c);
                        }
                    });
                    if (canList.length > 0) {
                        let toList = {
                            date: d,
                            cans: canList
                        }
                        cal.push(toList);
                    }
                });
                setCalList(cal);
            }
        }

    }

    // const url = 'https://demo.uiza.vn/candidates';
    const url = 'http://localhost:8080/staff/listcandidate';
    const { loading, error, data } = useFetch(url, 'GET');
    console.log(data);
    const [candidateList, setCandidateList] = useState([] as ICandidate[]);

    useEffect(() => {
        if (error == null) {
            if (data != null) {
                setCandidateList(data);
                if (!isSearching) classify(data);
            }
        }
    }, [data, sw]);

    const handleSearch = () => {
        const name = inputseacrh.name.trim();
        const department = inputseacrh.department.trim();
        const level = inputseacrh.level.trim();

        setIsSearching(true);
        let rs = [] as ICandidate[];

        if (name.length === 0) {
            if (department.length === 0) {
                if (level.length === 0) {
                    return;
                } else {
                    candidateList.forEach(can => {
                        if (can.level === level) {
                            rs.push(can);
                        }
                    });
                }
            }
            else {
                if (level.length === 0) {
                    candidateList.forEach(can => {
                        if (can.department === department) {
                            rs.push(can);
                        }
                    });
                }
                else {
                    candidateList.forEach(can => {
                        if (can.department === department && can.level === level) {
                            rs.push(can);
                        }
                    });
                }
            }
        }
        else {
            if (department.length === 0) {
                if (level.length === 0) {
                    candidateList.forEach(can => {
                        if (can.name === name) {
                            rs.push(can);
                        }
                    });
                }
                else {
                    candidateList.forEach(can => {
                        if (can.name === name && can.level === level) {
                            rs.push(can);
                        }
                    });
                }
            }
            else {
                if (level.length === 0) {
                    candidateList.forEach(can => {
                        if (can.name === name && can.department === department) {
                            rs.push(can);
                        }
                    });
                }
                else {
                    candidateList.forEach(can => {
                        if (can.name === name && can.department === department && can.level === level) {
                            rs.push(can);
                        }
                    });
                }
            }

        }

        console.log("Hope OK: ", rs);

        classify(rs);
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
                            <Input size="large" placeholder="large size" onChange={(e) => handleInputName(e)} />
                            <span className='name-inp-ic'><UserOutlined /></span>
                        </div>

                        <span className='mgt-10'>Phòng ban</span>
                        <Cascader className='c-cas' size='large' options={options} onChange={handleSelectDepartment} placeholder="Please select" />

                        <span className='mgt-10'>Vị trí</span>
                        <span className='border'>
                            <br />
                        </span>
                        <ul className='lv-list'>
                            {genLevelList.map((l, i) => (
                                <li id={l} key={i + 1} onClick={() => handleLevelClick(l)} className='mark-lv'><span>{l}</span></li>
                            ))}
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
                            <Button className='btn-search' onClick={handleSearch} icon={<SearchOutlined />}>
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