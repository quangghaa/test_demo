import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ICandidate, IQA } from "../interface";

export interface TestState {
    id: number;
    codeTest: string;
    subject: string;
    name: string;
    level: string;
    candidates: ICandidate[];
    // qas: IQA[];
    questions: IQA[];

    // chosen: Chosen[];
}

const initialState: TestState = {
    id: 0,
    codeTest: '',
    subject: '',
    name: '',
    level: '',
    candidates: [] as ICandidate[],
    questions: [] as IQA[],
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

        addCandidate: (state, action) => {
            state.candidates.push(action.payload);    
        },
        updateCandidates: (state, action) => {
            state.candidates = action.payload;
        },
        deleteCandidate: (state, action) => {

        },
        clear: (state) => {
            state.id = 0;
            state.codeTest = '';
            state.subject = '';
            state.name = '';
            state.level = '';
            state.candidates = [] as ICandidate[];
            state.questions = [] as IQA[];
        }
    }
});

export const { updateId, updateCode, updateType, updateName, updateLevel, addCandidate, addQa, deleteQa, updateQas, updateCandidates, clear } = testSlice.actions;

export const selectTest = (state: RootState) => state.test;

export default testSlice.reducer;