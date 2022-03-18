
export interface ICandidate {
    id: number;
    code: string;
    name: string;
    department: string;
    position: string;
    level: string;
    reporter: string;
    time: string;
    date: string;
}

export interface ICalendar {
    date: string;
    cans: ICandidate[];
}

export interface IQA {
    id: number;
    code: string;
    type: string;
    question: string;
    A: string;
    B: string;
    C: string;
    D: string;
    answer: string;
}

export interface ITest {
    id: number;
    code: string;
    type: string;
    name: string;
    level: string;
    candidates: ICandidate[];
    qas: IQA[];
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


