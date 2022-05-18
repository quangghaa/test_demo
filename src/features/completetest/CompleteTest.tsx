import { Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Header from '../header/Header';
import { selectCandidate } from '../reducer/listCandidateSlice';
import './CompleteTest.css';

const CompleteTest = (props: any) => {

    const candidate = useAppSelector(selectCandidate);

    return (
        <div>
            <Header start={props.start} />
            <div className='fullscreen body'>
                <span className='big-text'>Bài test kết thúc</span>

                {candidate[0].englishMark != -1 ? <p>Điểm ngoại ngữ: {candidate[0].englishMark}</p> : <></> }
                {candidate[0].knowledgeMark != -1 ? <p>Điểm kiến thức chung: {candidate[0].knowledgeMark}</p> : <></> }
                {candidate[0].codingMark != -1 ? <p>Điểm coding: {candidate[0].codingMark}</p> : <></> } 

                {candidate[0].englishMark + candidate[0].knowledgeMark + candidate[0].codingMark >= 24 
                ? <span className='big-text'>Ái chà dân chơi</span> : 
                <span className='big-text'>Cũng đỉnh đấy :)</span>}

                <Button className='begin'>
                    <Link to='/'>Quay về</Link>
                </Button>

            </div>
        </div>
    )
}

export default CompleteTest;