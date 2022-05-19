import { Col,  Row } from 'antd';
import HeaderD from '../headerD/HeaderD';
import Demo from './Demo';
import Question from './Question';
import './QuestionCollection.css';
import Test from './Test';


const QuestionCollection = (props: any) => {

    return (
        <div className='pdt-50'>
            <HeaderD />
            <Row>
                <Col span={6} className='pd-20 bdr mgt-20'>
                    <Test />
                </Col>

                <Col span={5} className='pd-20 bdr mgt-20'>
                    <Question />
                </Col>
                
                <Col span={13} className='pd-20 mgt-20'>
                    <Demo />
                </Col>
            </Row>

        </div>
    )
}

export default QuestionCollection;