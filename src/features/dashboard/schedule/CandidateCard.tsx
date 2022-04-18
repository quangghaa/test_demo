import { CloseOutlined, CalendarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addCandidate } from "../../reducer/listCandidateSlice";
import { selectTest } from "../../reducer/testSlice";
import './Schedule.css';

const CandidateCard = (props: any) => {

    const [showoptions, setShowoptions] = useState(1);

    const [visibleConfirm, setVisibleConfirm] = useState(false)

    const showConfirm = () => {
        setVisibleConfirm(true)
    }

    const onYes = () => {
        setVisibleConfirm(false)
    }

    const onNo = () => {
        setVisibleConfirm(false)
    }

    const isOdd = (n: number) => {
        if (n % 2 !== 0) return true;
        return false;
    }

    const openOptions = () => {
        setShowoptions(showoptions => showoptions + 1);
    }

    const Options = (props: any) => {
        const dispatch = useAppDispatch();
        const test = useAppSelector(selectTest);

        const onSetupTest = () => {

            if (!test.candidates.includes(props.data)) dispatch(addCandidate(props.data));
        }

        return (
            <ul id='ol' className='option-list' style={{ display: isOdd(showoptions) ? 'none' : '' }}>
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
                        <span className="remove-cand-ic" onClick={showConfirm}><CloseOutlined /></span>
                    </span>
                </div>
                <Modal
                    title="Xác nhận"
                    visible={visibleConfirm}
                    onOk={onYes}
                    onCancel={onNo}
                    okText="Có"
                    cancelText="Không"
                >
                    <p>Xóa ứng viên?</p>
                </Modal>

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
            <Options data={props.data} id={props.data.code} />
        </li>
    )
}

export default CandidateCard;