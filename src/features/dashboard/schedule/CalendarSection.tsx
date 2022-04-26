import CandidateCard from "./CandidateCard";
import './Schedule.css';

const CalendarSection = (props: any) => {
    console.log("LIST: ",props.list);
    return (
        <div>
            {props.list.map((cal: any) => (
                <div className='col mgt-20'>
                    <span className='cal-date'>{cal.date}</span>
                    <ul className='c-cal'>
                        {cal.candidates.map((c: any) => (
                            <CandidateCard data={c} date={cal.date} reload={props.reload} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default CalendarSection;