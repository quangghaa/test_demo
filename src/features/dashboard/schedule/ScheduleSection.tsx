import { Row, Col } from "antd"
import CandidateCard from "./CandidateCard"
import './Schedule.css';

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

export default ScheduleSection;