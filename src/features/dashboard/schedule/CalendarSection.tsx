import CandidateCard from "./CandidateCard";
import { Space } from "antd"
import './Schedule.css';

const CalendarSection = (props: any) => {
    // console.log("LIST: ", props.list);
    return (
        <div>
            {props.list.map((candidate: any, key: any) => {
                return (
                    <Space key={key}>
                        <div className='col mgt-20'>
                            <span className='cal-date'>{candidate.dates}</span>
                            <ul className='c-cal'>


                                <CandidateCard data={candidate} date={candidate.dates} reload={props.reload} />

                            </ul>
                        </div>
                    </Space>
                )
            })}

        </div>
    )
}

export default CalendarSection;