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
    // qas: IQA[];
    questions: IQA[];
}

const initialState: TestState[] = [] as TestState[]

export const listTestSlice = createSlice({
    name: 'listTest',
    initialState,
    reducers: {
        addTest: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { addTest } = listTestSlice.actions;

export const selectListTest = (state: RootState) => state.listTest;

export default listTestSlice.reducer;