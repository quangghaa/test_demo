
export interface ICandidate {
    id: number;
    code: string;
    name: string;
    department: string;
    position: string;
    level: string;
    reporter: string;
    time: string;
    dates: string;

    phone: string;
    email: string;
    englishMark: number;
    codingMark: number;
    knowledgeMark: number;
}

export interface ICandidateBody {
    name: string;
    department: string;
    position: string;
    level: any;
    date: string;
    time: string;
    phone: string;
    email: string;
}

export interface ICalendar {
    date: string;
    cans: ICandidate[];
}

export interface IChoice {
    // id: number;
    isTrue: number;
    answer: string;
}

export interface IQA {
    id: number;
    type: any;
    subject: any;
    content: string;
    level: any;
    multipleChoiceQuestions: IChoice[]; 
    answer: string;
}

export interface ITest {
    id: number;
    codeTest: string;
    subject: string;
    name: string;
    level: string;
    candidates: ICandidate[];
    questions: IQA[];
}

export interface ITestBody {
    codeTest: string;
    name: string;
    subject: any;
    level: any;
    times: string;
}

export interface QA {
    question: string;
    choose: string[];
    answer: string;
}

export interface QData {
    type: string;
    code: string;
    title: string;
    level: string;
    qa: QA[];
}

export interface IChosen {
    id: number;
    value: string;
}

export interface ChosenAns {
    id: number;
    idAnswer: number;
    type: number;
    answer: string;
    idCandidate: number;
    idTest: number;
}

export interface CacheAns {
    key: string;
    value: ChosenAns;
}


