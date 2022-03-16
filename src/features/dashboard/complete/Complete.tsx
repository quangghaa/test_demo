import { CloseOutlined, SearchOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, Col, Input, Row } from 'antd';
import HeaderD from '../headerD/HeaderD';
import './Complete.css';

const cansComData = [
    {
        name: 'Nguyen Van A',
        department: 'Phòng CN.Blockchain',
        position: 'Employee',
        level: 'Fresher',
        reporter: 'Quang Ha',
        complete: [80, 70, 80]
    },
    {
        name: 'Nguyen Van B',
        department: 'Phòng CN.Blockchain',
        position: 'Employee',
        level: 'Leader',
        reporter: 'Quang Ha',
        complete: [80, 70, 80]
    },
    {
        name: 'Nguyen Van C',
        department: 'Phòng CN.Blockchain',
        position: 'Employee',
        level: 'Fresher',
        reporter: 'Quang Ha',
        complete: [80, 70, 80]
    }

]

const Complete = () => {
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
                        <span className='border'>
                            <br />
                        </span>
                        <ul className='level-list'>
                            <li>Fresher</li>
                            <li>Junior</li>
                            <li>Senior</li>
                        </ul>
                        
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
                        <li>
                            <div className='left'>
                                <div className='cans-info'>
                                    <span className='cans-name'>Nguyen Van A</span>
                                    <span className='mgt-10'><b>Phòng ban:&nbsp;</b>P.CN Blockchain</span>
                                    <span><b>Vị trí:&nbsp;</b>P.CN Blockchain</span>
                                    <span><b>Level:&nbsp;</b>P.CN Blockchain</span>
                                    <span><b>Người thêm:&nbsp;</b>P.CN Blockchain</span>
                                    <span className='row mgt-10'><b>Điểm:&nbsp;</b><Input className='com-inp' placeholder=''></Input></span>
                                </div>

                                <div className='chart'>
                                    Chart
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

                        {cansComData.map((c) => (
                            <li>
                            <div className='left'>
                                <div className='cans-info'>
                                    <span className='cans-name'>{c.name}</span>
                                    <span className='mgt-10'><b>Phòng ban:&nbsp;</b>{c.department}</span>
                                    <span><b>Vị trí:&nbsp;</b>{c.position}</span>
                                    <span><b>Level:&nbsp;</b>{c.level}</span>
                                    <span><b>Người thêm:&nbsp;</b>{c.reporter}</span>
                                    <span className='row mgt-10'><b>Điểm:&nbsp;</b><Input className='com-inp' placeholder=''></Input></span>
                                </div>

                                <div className='chart'>
                                    Chart
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

        </div>
    )
}

export default Complete;