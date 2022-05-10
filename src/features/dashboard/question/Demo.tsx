import { FieldTimeOutlined, CloseOutlined, CloseCircleOutlined, UserAddOutlined, CheckOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox, Col, Modal, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateOne } from "../../../services/api";
import fakeRequest from "../../../utils/fakeRequest";
import { ITest } from "../../interface";
import { deleteQa, selectTest, updateCandCodes, updateCandidates, deleteCandidate, clear } from "../../reducer/testSlice";

const Demo = () => {
    const [loading, setloading] = useState(false);
    const [testName, setTestName] = useState("")
    const [visibleSelectModal, setVisibleSelectModal] = useState(false);

    const [removeCandidateData, setRemoveCandidateData] = useState({
        showModal: false,
        candidateId: null,
    });

    const [candidateCode, setCandidateCode] = useState([]);

    const [allCandidates, setAllCandidates] = useState([] as any);
    const [defaultValue, setDefaultValue] = useState([] as any);
    const [candidatesInTest, setCandidatesInTest] = useState([] as any);

    const disPatch = useAppDispatch();

    const test = useAppSelector(selectTest);

    useEffect(() => {
        const allCandidates = [] as any;
        const defaultValue = [];
        const candidatesInTest = [];
        for (let i = 0; i < test.candidates.length; i++) {
            const obj = {
                value: test.candidates[i].id,
                label: test.candidates[i].name
            }

            defaultValue.push(test.candidates[i].id);
            candidatesInTest.push(obj);

            setDefaultValue(defaultValue);
            setCandidatesInTest(candidatesInTest);
        }

        for (let i = 0; i < test.allCandiddates.length; i++) {
            const obj = {
                value: test.allCandiddates[i].id,
                label: test.allCandiddates[i].name
            }
            allCandidates.push(obj);
        }

        setAllCandidates(allCandidates);


    }, [test]);

    const resetAll = () => {
        setCandidateCode([]);
        setAllCandidates([]);
        setDefaultValue([]);
        setCandidatesInTest([]);
        disPatch(clear());
    }

    const onSelectCandidate = (value: any) => {
        setCandidateCode(value);
    }

    const showSelectModal = () => {
        setVisibleSelectModal(true);
    }

    const onYes = () => {
        console.log("ALL cans: ", allCandidates);
        let newCandList = [];
        for (let i = 0; i < candidateCode.length; i++) {

            let index = -1;
            console.log("CODE i: ", candidateCode[i]);
            for (let j = 0; j < test.allCandiddates.length; j++) {
                if (test.allCandiddates[j].id == candidateCode[i]) {
                    console.log("TRUE");
                    index = j;
                }
            }

            if (index != -1) {
                newCandList.push(test.allCandiddates[index]);
            }
        }
        disPatch(updateCandidates(newCandList));
        setVisibleSelectModal(false);
    }

    const onNo = () => {
        setVisibleSelectModal(false);
    }

    const showConfirmDeleteModal = (id: any) => {
        setRemoveCandidateData({
            showModal: true,
            candidateId: id,
        });
    }

    const onYesDeleteCandidate = () => {
        disPatch(deleteCandidate(removeCandidateData.candidateId));

        setRemoveCandidateData({
            showModal: false,
            candidateId: null,
        });
    }

    const onNoDeleteCandidate = () => {
        setRemoveCandidateData({
            showModal: false,
            candidateId: null,
        });
    }

    const onRemoveQuestion = (q: any) => {
        disPatch(deleteQa(q));
    }

    const setNameTest = (e: any) => {
        setTestName(e.target.value)

    }

    const onSave = async () => {

        if (test.id != 0) {
            // const url = 'url/' + test.id;
            const body = {
                id: test.id,
                name: testName || test?.name,
                subject: test.subject,
                level: test.level,
                times: test.times,
                displayCandidate: test.candidates,
                questions: test.questions
            }
            console.log(body)
            try {
                setloading(true);
                const res = await updateOne('staff/updatetest', test.id, body);
                if (res) {
                    console.log("OKKKKKKKKKKKKK");
                    // disPatch(clear());
                    resetAll();
                }


            } finally {
                setloading(false);
            }
        }


    }

    const mapABC = (i: any) => {
        switch (i) {
            case 0: return 'A';
            case 1: return 'B';
            case 2: return 'C';
            case 3: return 'D';
            case 4: return 'E';
            default: return 'X';
        }
    }


    return (
        <>
            <div className='sticky-sec col'>
                <span className='font'>Demo</span>
                <Row gutter={16}>
                    <Col span={8}>
                        <span>Tên bài test: </span>
                        <p></p>
                        <Input placeholder={test.name} onChange={setNameTest}></Input>
                        <p></p>
                        <span className='row-center-y mgt-10'>
                            <FieldTimeOutlined className='big-time-ic' />
                            <span className='sm-box mgl-10'>{test.times}</span>
                        </span>
                    </Col>

                    <Col span={16} className='relative'>
                        <span>Tham gia test</span>
                        <span className="add-can" onClick={showSelectModal}><UserAddOutlined /></span>
                        <div className="row">
                            <div className='lar-box mgt-10'>
                                <ul className='can-list'>
                                    {candidatesInTest.length > 0 ?
                                        candidatesInTest.map((candidate: any) => (
                                            <>
                                                <li>
                                                    {candidate.value}{' '}{candidate.label} <span className="rm-can-code" onClick={() => showConfirmDeleteModal(candidate.value)}><CloseOutlined className='mgl-5' /></span>
                                                </li>

                                            </>
                                        ))
                                        :
                                        <></>
                                    }
                                </ul>
                            </div>
                            <Button className='btn-save mgl-30' onClick={onSave}>Lưu</Button>
                            {loading ? <Spin size="large" /> : <></>}
                        </div>
                        {removeCandidateData.showModal && (
                            <Modal
                                title="Xóa ứng viên khỏi bài test"
                                visible={removeCandidateData.showModal}
                                onOk={onYesDeleteCandidate}
                                onCancel={onNoDeleteCandidate}
                                okText="Có"
                                cancelText="Không"
                            >
                                <span>Xóa ứng viên này khỏi bài test?</span>
                            </Modal>
                        )}
                        {visibleSelectModal && (
                            <Modal
                                title="Thêm ứng viên"
                                visible={visibleSelectModal}
                                onOk={() => onYes()}
                                onCancel={onNo}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Checkbox.Group options={allCandidates} defaultValue={defaultValue} onChange={onSelectCandidate} />
                            </Modal>
                        )}


                    </Col>
                </Row>


            </div>

            <ul className='demo-qs-list'>
                {test.questions.map((q: any, i: any) => {
                    return (
                        <li className="">
                            <span className="rm-question" onClick={() => onRemoveQuestion(q)}><CloseCircleOutlined /></span>
                            <span>{i + 1}.&nbsp;{q.content}</span>
                            <ul className='qs-ans-list'>
                                {q.multipleChoiceQuestions.length > 0 ? q.multipleChoiceQuestions.map((c: any, i: any) => (
                                    <li>
                                        {/* <Checkbox onChange={onSelectAns}>{c.answer}</Checkbox> */}
                                        {c.isTrue != 0 ? <span className="correct-ans"><CheckOutlined /></span> : <></>}
                                        <span>{mapABC(i)}.&nbsp;{c.answer}</span>
                                    </li>
                                ))

                                    : <></>}
                            </ul>

                        </li>
                    )
                })}
            </ul>

        </>
    )
}

export default Demo;