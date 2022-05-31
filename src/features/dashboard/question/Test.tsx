import { CloseOutlined, SearchOutlined, PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Input, Cascader, Button, Modal, TimePicker, Spin, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createOne, deleteOne, getList, getOne } from "../../../services/api";
import { ConditionSearch, ConditionSearch2, ICandidate, ITest, ITestBody } from "../../interface";
import { statusNotification } from '../../notification/Notification';
import { updateAllCandidates, updateCandidates, updateId, updateLevel, updateName, updateQas, updateSubject, updateTime } from "../../reducer/testSlice";

const Test = (props: any) => {
    const test = [
        {
            value: '1',
            label: 'Tiếng anh'
        },
        {
            value: '2',
            label: 'Coding'
        },
        {
            value: '3',
            label: 'Kiến thức chung'
        },
    ];

    const lev = [
        {
            value: '1',
            label: 'Intern'
        },
        {
            value: '2',
            label: 'Fresher'
        },
        {
            value: '3',
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
            label: 'Coding'
        },
        {
            value: '3',
            label: 'Kiến thức chung'
        },
    ];

    const [visibleTest, setVisibleTest] = useState(false);

    const [searchBody, setSearchBody] = useState({

    } as ConditionSearch2)

    const [addBody, setAddBody] = useState({
        codeTest: '',
        name: '',
        subject: {
            id: 0
        },
        level: {
            id: 0
        },
        times: ''
    } as ITestBody)

    const [testList, setTestList] = useState([] as ITest[]);

    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(0);

    const [visibleConfirm, setVisibleConfirm] = useState(false);

    const [allCands, setAllCands] = useState([] as ICandidate[]);

    console.log(testList)

    useEffect(() => {
        const getAllTest = async () => {
            setLoading(true);
            try {
                const res = await getList('staff/getalltest');
                if (res && res.data != null) {
                    setTestList(res.data);
                }
            } finally {
                setLoading(false);
            }
        }

        getAllTest();
    }, [reload])

    //SEARCH
    const onSelectTest = (value: any) => {
        if (value === undefined) {
            setSearchBody({ ...searchBody })
        } else {
            setSearchBody({ ...searchBody, TEST_BYSUBJECT: value[0] })
        }

    }

    const onSelectLevel = (value: any) => {
        if (value === undefined) {
            setSearchBody({ ...searchBody })
        } else {
            setSearchBody({ ...searchBody, TEST_BYLEVEL: value[0] });
        }

    }

    const enterTestname = (e: any) => {
        if (e.target.value === '') {
            setSearchBody({ ...searchBody })
        } else {
            setSearchBody({ ...searchBody, TEST_BYNAME: e.target.value });
        }

    }
    //SEARCH

    //ADD
    const onSelectLev = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }
        setAddBody({ ...addBody, level: obj });
    }



    const onSelectTestType = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }
        setAddBody({ ...addBody, subject: obj });
    }

    const enterCode = (e: any) => {
        setAddBody({ ...addBody, codeTest: e.target.value });
    }

    const enterName = (e: any) => {
        setAddBody({ ...addBody, name: e.target.value });
    }

    const enterTime = (e: any) => {
        let x = parseInt(e.target.value);
        let h = Math.floor(x / 60) + '';
        let m = x % 60 + '';
        if (h.length == 1) h = '0' + h;
        if (m.length == 1) m = '0' + m;

        const time = h + ':' + m + ':' + '00';
        setAddBody({ ...addBody, times: time });
    }

    //ADD

    //API SEARCH
    const onSearch = async () => {
        try {
            const condition: any = {
                condition: {
                    ...searchBody
                }
            }


            if (Object.keys(condition.condition).length === 0) {
                const res = await getList('staff/getalltest');
                if (res && res.data != null) {
                    setTestList(res.data);
                }
            } else if (Object.keys(condition.condition).length !== 0) {
                const res = await createOne('staff/search', condition)
                setTestList(res.data)
            }
            statusNotification(true, "Tìm kiếm thành công")
            // console.log(searchBody, "searchbody")
        } catch (error) {
            statusNotification(false, "Tìm kiếm thất bại")
        }
    }
    //API SEARCH
    const showTestModal = () => {
        setVisibleTest(true);
    }

    const dispatch = useAppDispatch();
    //API ADD
    const onSaveTest = async () => {
        try {
            const res = await createOne('staff/addtest', addBody);
            console.log(res)
            if (res) {
                setVisibleTest(false)
                setReload(reload => reload + 1);
                statusNotification(true, "Thêm bài test thành công")
            } else {
                setVisibleTest(false)
            }
        } catch (error) {
            statusNotification(false, "Thêm bài test thất bại")
        } finally {
            setVisibleTest(false)
        }

    }
    //API ADD

    const onCancelTest = () => {
        setVisibleTest(false)
    }

    const onTestClick = async (id: any) => {
        console.log("Click : ", id);
        try {
            setLoading(true);
            const res = await getOne('staff/gettestbyid', id);

            if (res) {
                console.log("data res: ", res.data);
                dispatch(updateId(res.data.id));
                dispatch(updateName(res.data.name));
                dispatch(updateSubject(res.data.subject));
                dispatch(updateLevel(res.data.level));
                dispatch(updateTime(res.data.times));
                dispatch(updateCandidates(res.data.displayCandidate));
                dispatch(updateQas(res.data.questions))
            }

            const res2 = await getList('staff/listcandidate');
            if (res2) {
                console.log("ALL cands: ", res2.data);
                dispatch(updateAllCandidates(res2.data));
                // setAllCands(res2.data);
            }
        } finally {
            setLoading(false)
        }
    }

    const onShowConfirm = (e: any, id: any) => {
        e.stopPropagation(id);
        console.log(id)
        setVisibleConfirm(id);
    }

    const onYes = async (id: any) => {
        console.log("DELETE", id);

        setLoading(true);

        try {
            const res = await deleteOne('staff/deletetest', id);
            if (res) {

                setVisibleConfirm(id);
                setReload(reload => reload + 1);
                statusNotification(true, "Xóa bài test thành công")
            }
        } catch (error) {
            statusNotification(false, "Xóa bài test thất bại")
        } finally {
            setLoading(false)
        }
    }

    const onNo = (id: any) => {
        setVisibleConfirm(false);
        console.log("oh no id sai", id)
    }

    const handleRemoveLevelCLick = () => {
        window.location.reload();
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
                        <Cascader size="small" options={lev} onChange={onSelectLevel} placeholder='Which level?' />
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
                        <Cascader className='c-cas' size='large' options={lev} onChange={onSelectLev} placeholder="Which level?" />
                    </span>

                    <span className='col mgt-10'>
                        <span>Thời gian làm bài: </span>
                        {/* <TimePicker onChange={enterTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> */}
                        <Input placeholder='Nhập thời gian làm bài' className='' onChange={enterTime}></Input>
                    </span>

                </Modal>

            </div>

            {loading ?
                <div className="center mgt-10">
                    <Spin size="large" />
                </div> : <></>}

            {testList.length > 0 ?
                <ul className='rs-test-list'>
                    {testList && testList.map((t: any, i: any) => {
                        return (
                            <>
                                <li key={i} onClick={() => onTestClick(t.id)}>
                                    <span className='ic-close' onClick={(e: any) => onShowConfirm(e, t.id)}><CloseCircleFilled /></span>
                                    {/* <span className='lv-cir'>{t.level}</span> */}
                                    <span>{t.name + " LEVEL: " + t.level.name}</span>
                                </li>
                                <Modal
                                    title="Xác nhận"
                                    visible={visibleConfirm === t.id}
                                    onOk={() => onYes(t.id)}
                                    onCancel={() => onNo(t.id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <p>Xóa bài test?</p>
                                </Modal>
                            </>
                        )
                    })}
                </ul>
                :
                <></>
            }

        </>
    )
}

export default Test;