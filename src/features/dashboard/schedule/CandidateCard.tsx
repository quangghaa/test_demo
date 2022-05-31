import { CloseOutlined, CalendarOutlined, EditOutlined, MailFilled, PhoneFilled, UserOutlined } from "@ant-design/icons";
import { Modal, Button, Input, Cascader, DatePicker, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import moment from 'moment';
import { ICandidateBody } from '../../interface';
import { updateOne } from '../../../services/api';
import { deleteOne } from "../../../services/api";
import { addCandidate } from "../../reducer/listCandidateSlice";
import { selectTest } from "../../reducer/testSlice";

import './Schedule.css';
import statusNotification from "../../notification/Notification";
import fakeRequest from "../../../utils/fakeRequest";
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
const CandidateCard = (props: any) => {

    const [showoptions, setShowoptions] = useState(1);
    const [reload, setReload] = useState(0);
    const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false);
    const [visibleConfirmEdit, setVisibleConfirmEdit] = useState(false);

    const showConfirmDelete = (e: any) => {
        e.stopPropagation();
        setVisibleConfirmDelete(true)
    }

    const showConfirmEdit = (e: any) => {
        e.stopPropagation();
        setVisibleConfirmEdit(true)
    }

    const [addBody, setAddBody] = useState({
        name: props.data?.name || '',
        department: props.data?.department || '',
        position: props.data?.position || '',
        level: {
            id: props.data?.level.id || 0,
        },
        dates: props.data?.dates || '',
        times: props.data?.times || '',
        phone: props.data?.phone || '',
        email: props.data?.email || '',
    } as ICandidateBody)

    const enterNameModal = (e: any) => {
        setAddBody({ ...addBody, name: e.target.value })
    }

    const onSelectPosModal = (value: any) => {
        setAddBody({ ...addBody, position: value[0] })
    }

    const onSelectLevModal = (value: any) => {
        const obj = {
            id: parseInt(value[0])
        }
        setAddBody({ ...addBody, level: obj })
    }

    const onSelectDateModal = (value: any) => {
        const selectDate = new Date(value);
        let y = selectDate.getFullYear() + '';
        let m = selectDate.getMonth() + 1 + '';
        let d = selectDate.getDate() + '';

        if (m.length == 1) m = '0' + m;
        if (d.length == 1) d = '0' + d;
        const date = y + '-' + m + '-' + d;
        // setSearchBody({ ...searchBody, date: selectDate.toString() })
        // setDatetime({...datetime, date: date});
        setAddBody({ ...addBody, dates: date });
    }

    const editCandidate = async (id: any) => {
        try {
            console.log(addBody)
            const res = await updateOne("staff/candidate/update", id, addBody);
            if (res) {
                setVisibleConfirmEdit(false)
                statusNotification(true, "Cập nhật ứng viên thành công")
            }

        } catch (error) {
            console.log(error)
            statusNotification(false, "Cập nhật ứng viên thất bại")
        }
    }


    const onSelectTimeModal = (value: any) => {
        const selectTime = new Date(value);

        let h = selectTime.getHours() + '';
        let m = selectTime.getMinutes() + '';
        let s = selectTime.getSeconds() + '';

        if (h.length == 1) h = '0' + h;
        if (m.length == 1) m = '0' + m;
        if (s.length == 1) s = '0' + s;

        const time = h + ':' + m + ':' + s;
        // setDatetime({...datetime, time: time});
        setAddBody({ ...addBody, times: time });
    }

    const enterEmailModal = (e: any) => {
        setAddBody({ ...addBody, email: e.target.value })
    }

    const enterPhoneModal = (e: any) => {
        setAddBody({ ...addBody, phone: e.target.value })
    }
    const onYes = (e: any, id: any) => {
        e.stopPropagation();
        const removeCandidate = async () => {
            const res = await deleteOne('staff/delete', id);
            console.log("RES: ", res, res.status);

            if (res && res.status == 200) {

                console.log("DELETED");
                setVisibleConfirmDelete(false);
                statusNotification(true, "Xóa ứng viên thành công")
                props.reload();
            } else {
                console.log("Delete failed");
                statusNotification(false, "Xóa ứng viên thất bại")
            }

        }

        removeCandidate();

    }

    const onNo = (e: any) => {
        e.stopPropagation();
        setVisibleConfirmDelete(false);
    }

    const cancelEdit = (e: any) => {
        e.stopPropagation();
        setVisibleConfirmEdit(false);
    }

    const okEdit = (e: any, id: any) => {

    }

    const isOdd = (n: number) => {
        if (n % 2 !== 0) return true;
        return false;
    }

    const openOptions = () => {
        setShowoptions(showoptions => showoptions + 1);
    }

    return (
        <li id='opstion-parent' key={props.data.id} className='mgt-20' onClick={openOptions}>
            <div className='c-card col'>
                <div className='row-between c-h'>
                    <span>{props.data.id + ". " + props.data.name}</span>
                    <span>
                        <span className='remove-cand-ic-edit' onClick={(e: any) => showConfirmEdit(e)}><EditOutlined /></span>
                        <span className="remove-cand-ic-delete" onClick={(e: any) => showConfirmDelete(e)}><CloseOutlined /></span>
                    </span>
                </div>
                <Modal
                    title="Xác nhận"
                    visible={visibleConfirmDelete}
                    onOk={(e) => onYes(e, props.data.id)}
                    onCancel={(e) => onNo(e)}
                    okText="Có"
                    cancelText="Không"
                >
                    <p>Xóa ứng viên?</p>
                </Modal>

                {visibleConfirmEdit && (
                    <Modal
                        title='Sửa ứng viên'
                        visible={visibleConfirmEdit}
                        // confirmLoading={confirmLoading}
                        onCancel={cancelEdit}
                        className="create-form"
                        footer={[
                            <div className='col'>
                                <div className='center'>
                                    <Button key="submit" onClick={() => editCandidate(props.data.id)} className='btn-login'>
                                        Lưu
                                    </Button>

                                    <Button key="cancel" onClick={cancelEdit} className='btn-login'>
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
                                <Input

                                    size="large" placeholder={props.data.name} onChange={enterNameModal} />
                                <span className='name-inp-ic'><UserOutlined /></span>

                            </div>

                            <span className='mgt-10'>Vị trí</span>
                            <Cascader className='c-cas' size='large' options={pos} onChange={onSelectPosModal} placeholder={props.data.position} />

                            <span className='mgt-10'>Level</span>
                            <Cascader className='c-cas' size='large' options={lev} onChange={onSelectLevModal} placeholder={props.data.level.name} />

                            {/* <span className='mgt-10'>Upload Photo</span>
                             <Upload {...uploadFile}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload> */}


                            <div className='row-between mgt-10'>
                                <div className='col'>
                                    <span>Lịch</span>
                                    <DatePicker onChange={onSelectDateModal} placeholder={props.data.dates} />
                                    <TimePicker className='mgt-10' onChange={onSelectTimeModal} placeholder={props.data.times} />
                                </div>
                                <div id='contact' className='col mgl-20'>
                                    <span>Liên hệ</span>
                                    <Input size="small" onChange={enterEmailModal} placeholder={props.data.email} prefix={<MailFilled />} />
                                    <Input className='mgt-10' onChange={enterPhoneModal} size="small" placeholder={props.data.phone} prefix={<PhoneFilled />} />
                                </div>
                            </div>

                        </div>

                    </Modal>
                )}
                <span>
                    <span className='bold'>Name: </span>
                    {props.data.name}
                </span>

                <span>
                    <span className='bold'>Vị trí: </span>
                    {props.data.position}
                </span>

                <span>
                    <span className='bold'>Level: </span>
                    {props.data.level != null ? props.data.level.name : ""}
                </span>

                <span>
                    <span className='bold'>Reporter: </span>
                    {props.data.reporter}
                </span>

                <span>
                    <span className='bold'>Phone: </span>
                    {props.data.phone}
                </span>

                <span>
                    <span className='bold'>Email: </span>
                    {props.data.email}
                </span>
                <p></p>
                <div className='center'>
                    <span className='c-time'>
                        <CalendarOutlined className='mgr-10' />
                        <span>{props.data.dates}</span>
                    </span>
                    <p></p>
                </div>
            </div>
            {/* <Options data={props.data} id={props.data.code} /> */}
        </li>
    )
}

export default CandidateCard;