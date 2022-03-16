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
        updateQas: (state, action) => {
            state.qas = action.payload;
        },
        updateCandidates: (state, action) => {
            state.candidates = action.payload;
        },
        // addAnswer: (state, action) => {
        //     state.chosen.push(action.payload);
        // },
        // updateAnswer: (state, action) => {
        //     state.chosen.map((c, i) => {
        //         if(c.id === action.payload.id) {
        //             state.chosen[i] = action.payload;
        //         }
        //     })
        // }
    }
});

export const { updateId, updateCode, updateType, updateName, updateLevel, addCandidate, updateQas, updateCandidates } = testSlice.actions;

export const selectTest = (state: RootState) => state.test;

export default testSlice.reducer;