import { CloseOutlined, SearchOutlined, PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Input, Cascader, Button, Modal, TimePicker, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { createOne, deleteOne, getList, getOne } from "../../../services/api";
import { ICandidate, ITest, ITestBody } from "../../interface";
import { updateAllCandidates, updateCandidates, updateId, updateLevel, updateName, updateQas, updateSubject, updateTime } from "../../reducer/testSlice";

const Test = (props: any) => {
    const test = [
        {
            value: '1',
            label: 'Tiếng anh'
        },
        {
            value: '2',
            label: 'Kiến thức chung'
        },
    ];

    const lev = [
        {
            value: '1',
            label: 'Junior'
        },
        {
            value: '2',
            label: 'Middle'
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
            label: 'Kiến thức chung'
        },
    ];

    const [visibleTest, setVisibleTest] = useState(false);

    const [searchBody, setSearchBody] = useState({
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

    const onSelectTest = (value: any) => {

    }

    const onSelectLev = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }
        setSearchBody({ ...searchBody, level: obj });
    }

    const enterTestname = (e: any) => {
        setSearchBody({ ...searchBody, name: e.target.value });
    }

    const onSelectTestType = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }
        setSearchBody({ ...searchBody, subject: obj });
    }

    const enterCode = (e: any) => {
        setSearchBody({ ...searchBody, codeTest: e.target.value });
    }

    const enterName = (e: any) => {
        setSearchBody({ ...searchBody, name: e.target.value });
    }

    const enterTime = (e: any) => {
        let x = parseInt(e.target.value);
        let h = Math.floor(x / 60) + '';
        let m = x % 60 + '';
        if (h.length == 1) h = '0' + h;
        if (m.length == 1) m = '0' + m;

        const time = h + ':' + m + ':' + '00';
        setSearchBody({ ...searchBody, times: time });
    }

    const onSearch = () => {

    }

    const showTestModal = () => {
        setVisibleTest(true);
    }

    const dispatch = useAppDispatch();

    const onSaveTest = async () => {
        try {
            const res = await createOne('staff/addtest', searchBody);
            if (res) {
                setVisibleTest(false)
                setReload(reload => reload + 1);
            }
        } finally {

        }

    }

    const onCancelTest = () => {
        setVisibleTest(false)
    }

    const onTestClick = async (id: any) => {
        console.log("Click : ", id);
        try {
            setLoading(true);
            const res = await getOne('staff/gettestbyid', id);
            const res2 = await getList('staff/listcandidate');

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
            }

        } finally {
            setLoading(false)
        }
    }

    const onNo = (id: any) => {
        setVisibleConfirm(false);
        console.log("oh no id sai", id)
    }

    const onRemoveTest = async (e: any, id: any) => {
        e.stopPropagation();

        console.log("DELETE", id);

        setLoading(true);

        try {
            const res = await deleteOne('staff/deletetest', id);
            if (res) {

                setReload(reload => reload + 1);

            }

        } finally {
            setLoading(false)
        }
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
                                    <span>{t.name}</span>
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