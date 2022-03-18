import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ICandidate, IQA } from "../interface";

export interface TestState {
    id: number;
    code: string;
    type: string;
    name: string;
    level: string;
    candidates: ICandidate[];
    qas: IQA[];

    // chosen: Chosen[];
}

const initialState: TestState = {
    id: 0,
    code: '',
    type: '',
    name: '',
    level: '',
    candidates: [] as ICandidate[],
    qas: [] as IQA[],

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
            state.code = action.payload;
        },
        updateType: (state, action) => {
            state.type = action.payload;
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
            state.qas = [...[state.qas], action.payload];
        },
        deleteQa: (state, action) => {
            state.qas = state.qas.filter((value: any, index:any) => {
                return index != action.payload;
            })
        },
        updateQas: (state, action) => {
            state.qas = action.payload;
        },
        updateCandidates: (state, action) => {
            state.candidates = action.payload;
        },
        clear: (state) => {
            state.id = 0;
            state.code = '';
            state.type = '';
            state.name = '';
            state.level = '';
            state.candidates = [] as ICandidate[];
            state.qas = [] as IQA[];
        }
    }
});

export const { updateId, updateCode, updateType, updateName, updateLevel, addCandidate, deleteQa, updateQas, updateCandidates, clear } = testSlice.actions;

export const selectTest = (state: RootState) => state.test;

export default testSlice.reducer;