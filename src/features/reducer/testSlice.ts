import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ICandidate, IQA } from "../interface";

export interface TestState {
    id: number;
    // code: string;
    codeTest: string;
    // type: string;
    subject: number;
    name: string;
    level: number;
    candidates: ICandidate[];
    // qas: IQA[];
    questions: IQA[];

    // chosen: Chosen[];
}

const initialState: TestState = {
    id: 0,
    codeTest: '',
    subject: 0,
    name: '',
    level: 0,
    candidates: [] as ICandidate[],
    // qas: [] as IQA[],
    questions: [] as IQA[],

    // chosen: [] as Chosen[],
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
        addCandidate: (state, action) => {
            state.candidates.push(action.payload);    
        },
        addQa: (state, action) => {
            state.questions = [...[state.questions], action.payload];
        },
        deleteQa: (state, action) => {
            state.questions = state.questions.filter((value: any, index:any) => {
                return index != action.payload;
            })
        },
        updateQas: (state, action) => {
            state.questions = action.payload;
        },
        updateCandidates: (state, action) => {
            state.candidates = action.payload;
        },
        clear: (state) => {
            state.id = 0;
            state.codeTest = '';
            state.subject = 0;
            state.name = '';
            state.level = 0;
            state.candidates = [] as ICandidate[];
            state.questions = [] as IQA[];
        }
    }
});

export const { updateId, updateCode, updateType, updateName, updateLevel, addCandidate, deleteQa, updateQas, updateCandidates, clear } = testSlice.actions;

export const selectTest = (state: RootState) => state.test;

export default testSlice.reducer;