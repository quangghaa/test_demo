import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ICandidate, IQA } from "../interface";

export interface ICandCode {
    id: number;
    name: string;
}

export interface TestState {
    id: number;
    codeTest: string;
    subject: string;
    name: string;
    level: string;
    candidates: ICandidate[];
    candCodes:  ICandCode[],
    // qas: IQA[];
    questions: IQA[];
    times: string;
}

const initialState: TestState = {
    id: 0,
    codeTest: '',
    subject: '',
    name: '',
    level: '',
    candidates: [] as ICandidate[],
    candCodes: [] as ICandCode[],
    questions: [] as IQA[],
    times: ''
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        updateId: (state, action) => {
            state.id = action.payload;
        },
        updateCode: (state, action) => {
            state.codeTest = action.payload;
        },
        updateType: (state, action) => {
            state.subject = action.payload;
        },
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateLevel: (state, action) => {
            state.level = action.payload;
        },
        addQa: (state, action) => {
            state.questions = [...state.questions, action.payload];
        },
        deleteQa: (state, action) => {
            state.questions = state.questions.filter((question: any, index:any) => {
                return question.id != action.payload.id;
            })
        },
        updateQas: (state, action) => {
            state.questions = action.payload;
        },

        addCandidate: (state, action) => {
            state.candidates.push(action.payload);    
        },
        updateCandCodes: (state, action) => {
            state.candCodes = action.payload;
        },
        updateCandidates: (state, action) => {
            state.candidates = action.payload;
        },
        deleteCandidate: (state, action) => {
            state.candidates = state.candidates.filter((candidate: any) => {
                return candidate.id != action.payload;
            })
        },
        updateTime: (state, action) => {
            state.times = action.payload;
        },
        clear: (state) => {
            state.id = 0;
            state.codeTest = '';
            state.subject = '';
            state.name = '';
            state.level = '';
            state.candidates = [] as ICandidate[];
            state.questions = [] as IQA[];
            state.times = ''
        }
    }
});

export const { updateId, updateCode, updateType, updateName, updateLevel, addCandidate, addQa, deleteQa, updateQas, updateCandidates, updateCandCodes, updateTime, clear } = testSlice.actions;

export const selectTest = (state: RootState) => state.test;

export default testSlice.reducer;