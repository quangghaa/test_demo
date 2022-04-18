import { CloseOutlined, SearchOutlined, PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Input, Cascader, Button, Modal, TimePicker, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getList } from "../../../services/api";
import { ITest, ITestBody } from "../../interface";

const Test = (props: any) => {
    const test = [
        {
            value: 'ENG',
            label: 'Tiếng anh'
        },
        {
            value: 'GEN',
            label: 'Kiến thức chung'
        },
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

    const testType = [
        {
            value: '1',
            label: 'Tiếng anh'
        },
        {
            value: '2',
            label: 'Kiến thức chung'
        },
    ];

    const [visibleTest, setVisibleTest] = useState(false);

    const [searchBody, setSearchBody] = useState({
        name: '',
        type: '',
        level: ''
    } as ITestBody)

    const [testList, setTestList] = useState([] as ITest[]);

    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(0);

    useEffect(() => {
        const getAllTest = async () => {
            setLoading(true);

            const res = await getList('staff/getalltest')

            if (res && res.data != null) {
                setTestList(res.data);
            }

            setLoading(false);
        }

        getAllTest();
    }, [reload])

    const onSelectTest = (value: any) => {

    }

    const onSelectLev = (value: any) => {
        setSearchBody({ ...searchBody, level: value });
    }

    const enterTestname = (e: any) => {
        setSearchBody({ ...searchBody, name: e.target.value });
    }

    const onSelectTestType = (value: any) => {
        setSearchBody({ ...searchBody, type: value });
    }

    const enterCode = (e: any) => {

    }

    const enterName = (e: any) => {

    }

    const enterLevel = (e: any) => {

    }

    const enterTime = (e: any) => {

    }

    const onSearch = () => {

    }

    const showTestModal = () => {
        setVisibleTest(true);
    }

    const onSaveTest = () => {
        setVisibleTest(false)
    }

    const onCancelTest = () => {
        setVisibleTest(false)
    }

    const onTestClick = (code: any) => {
        console.log("Click : ", code);
    }

    const onRemoveTest = (e: any, code: any) => {
        e.stopPropagation();
        console.log("DELETE", code);
    }

    const handleRemoveLevelCLick = () => {
        // const li = document.getElementsByClassName('mark-lv');
        // if (li != null) {
        //     const ar = Array.from(li);
        //     ar.forEach((el: any) => {
        //         el.style.color = 'black';
        //         el.style.backgroundColor = 'white';
        //     })
        // }

        // setLevel(0);
    }

    return (
        <>

            <div className='sticky-sec col'>

                <span className='font'>Bài test</span>

                <div className='special col'>
                    <span>Tên bài test</span>
                    <Input placeholder='Enter test name' onChange={enterTestname}></Input>

                    <span className='mgt-10'>Loại bài test</span>
                    <Cascader size="small" options={test} onChange={onSelectTest} placeholder='Which type?' />

                    <span className='mgt-10'>Level</span>
                    <div className='row-between row-center-y'>
                        <Cascader size="small" options={lev} onChange={onSelectLev} placeholder='Which level?' />
                        <Button className='btn-delete' onClick={handleRemoveLevelCLick} icon={<CloseOutlined />}>
                            Xóa lọc
                        </Button>
                    </div>
                </div>

                <span className='mgt-20 center'>
                    <Button className='btn-search' onClick={onSearch} icon={<SearchOutlined />}>
                        Tìm
                    </Button>
                    <Button className='btn-add' icon={<PlusOutlined />} onClick={showTestModal}>
                        Thêm
                    </Button>
                </span>

                <Modal
                    title='Thêm bài test'
                    visible={visibleTest}
                    // confirmLoading={confirmLoading}
                    onCancel={onCancelTest}
                    className="create-form"
                    footer={[
                        <div className='col'>
                            <div className='center'>
                                <Button key="submit" onClick={onSaveTest} className='btn-login'>
                                    Lưu bài test
                                </Button>

                                <Button key="cancel" onClick={onCancelTest} className='btn-login'>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                        ,
                    ]}
                >
                    <span className='row-between'>
                        <span>Loại bài test: </span>
                        <Cascader options={testType} onChange={onSelectTestType} placeholder="Please select" />
                    </span>
                    <span className='col mgt-10'>
                        <span>Mã bài test: </span>
                        <Input placeholder='Nhập mã bài test' className='' onChange={enterCode}></Input>
                    </span>

                    <span className='col mgt-10'>
                        <span>Tên bài test: </span>
                        <Input placeholder='Nhập tên bài test' className='' onChange={enterName}></Input>
                    </span>

                    <span className='col mgt-10'>
                        <span>Cấp độ bài test: </span>
                        <Input placeholder='Nhập tên bài test' className='' onChange={enterLevel}></Input>
                    </span>

                    <span className='col mgt-10'>
                        <span>Thời gian làm bài: </span>
                        <TimePicker onChange={enterTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </span>

                </Modal>
            </div>

            {loading ?
                <div className="center mgt-10">
                    <Spin size="large" />
                </div> : <></>}

            {testList.length > 0 ?
                <ul className='rs-test-list'>
                    {testList.map((t: any, i: any) => {
                        return (
                            <li key={i} onClick={() => onTestClick(t.codeTest)}>
                                <span className='ic-close' onClick={(e: any) => onRemoveTest(e, t.codeTest)}><CloseCircleFilled /></span>
                                {/* <span className='lv-cir'>{t.level}</span> */}
                                <span>{t.name}</span>
                            </li>
                        )
                    })}
                </ul>
                :
                <></>    
            }
            {/* <ul className='rs-test-list'>
                {!isSearching ? testData.map((t, i) => (
                    <li key={i} onClick={() => handleTestClick(t.codeTest)}>

                        <span className='lv-cir'>{t.level}</span>

                        <span>{t.name}</span>
                    </li>
                )) : rsSearch.map((t, i) => (
                    <li key={i} onClick={() => handleTestClick(t.codeTest)}>
                        <span className='lv-cir'>{t.level}</span>
                        <span>{t.name}</span>
                    </li>
                ))
                }


            </ul> */}

        </>
    )
}

export default Test;