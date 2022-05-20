import { PropertySafetyFilled, UndoOutlined } from '@ant-design/icons';
import { Button, Cascader, Col, Radio, Row, Space, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { type } from 'os';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Header from '../header/Header';
import { CacheAns, IChosen, IQA } from '../interface';
import { addAnswer, addCache, Answer, selectCacheAnswer } from '../reducer/cacheAnswerSlice';
import { selectCandidate } from '../reducer/listCandidateSlice';
import { selectListTest } from '../reducer/listTestSlice';
import EnglishTest from './EnglishTest';
import GeneralTest from './GeneralTest';
import './Test.css';

interface TestContent {
    testId: number,
    content: IQA[]
}

const Test = (props: any) => {

    const listTest = useAppSelector(selectCandidate);

    const [switchview, setSwitchview] = useState('ENG' && 'GEN');

    const toEng = () => {
        setSwitchview('ENG');
    }

    const toGen = () => {
        setSwitchview('GEN');
    }

    const toCode = () => {
        setSwitchview('CODE');
    }

    const renderView = (cId: any, tests: any) => {
        console.log("ID and Props: ", cId, tests);
        const canId = cId;

        let engCt = {} as TestContent;
        let genCt = {} as TestContent;
        if (Array.isArray(tests) && tests.length > 0) {
            tests.map(t => {
                // English
                if (t.subject.id === 1) {
                    const ct = {
                        testId: t.id,
                        content: t.questions
                    }
                    engCt = ct;
                }

                // Coding
                if (t.subject.id === 2) {
                    const ct = {
                        testId: t.id,
                        content: t.questions
                    }
                    genCt = ct;
                }
            })
        }

        console.log("eng & gen: ", engCt, genCt)

        switch (switchview) {
            case 'ENG': return <EnglishTest canId={canId} data={engCt} finish={props.finish} type={switchview} />
            case 'GEN': return <GeneralTest canId={canId} data={genCt} finish={props.finish} type={switchview} />

        }
    }

    const convertTime = (value: any) => {
        // if (value == null) {
        //     return value === Date.now()
        // }
        const splitString = value.split(":")
        const splitTime = (+splitString[0] * 60 * 60 * 10) + (+splitString[1] * 60 * 10) + splitString[2]
        const timeTest = Date.now() + parseInt(splitTime)
        return timeTest

    }

    const timeTest = useRef(convertTime(listTest[0].times))
    console.log(listTest, "listetessssssssssssssss")
    return (
        <div>
            <Header start={props.start} time={timeTest} finish={props.finish} />
            <div className='full-height row'>
                <ul className='nav'>
                    {listTest.map((t) => {
                        return (
                            t.tests.map(t_test => {
                                if (t_test.subject.name === "English") {

                                    return (
                                        <div>
                                            <li className='nav-item' onClick={toEng}><span className='vertical'>Tiếng anh</span></li>
                                        </div>
                                    )
                                } else if (t_test.subject.name === "Coding") {

                                    return (
                                        <div>
                                            <li className='nav-item' onClick={toGen}><span className='vertical'>Kiến thức chung</span></li>
                                        </div>

                                    )
                                } else if (t_test.subject.name === "English" && t_test.subject.name === "Coding") {
                                    return (
                                        <div>
                                            <li className='nav-item' onClick={toEng}><span className='vertical'>Tiếng anh</span></li>
                                            <li className='nav-item' onClick={toGen}><span className='vertical'>Kiến thức chung</span></li>
                                        </div>
                                    )
                                }
                            })
                        )
                    })}
                    {/* <li className='nav-item' onClick={toEng}><span className='vertical'>Tiếng anh</span></li>
                    <li className='nav-item' onClick={toGen}><span className='vertical'>Kiến thức chung</span></li> */}


                </ul>

                <div className='cus-pd fullwidth'>
                    {listTest.length > 0 ? renderView(listTest[0].id, listTest[0].tests) : <></>}
                </div>
            </div>

        </div>
    )
}

export default Test;


