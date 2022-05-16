import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IQA } from "../interface";

export interface CandidateState {
    times: string;
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

    tests: IQA[];
}

const initialState: CandidateState[] = [];

export const listCandidateSlice = createSlice({
    name: 'listCandidate',
    initialState,
    reducers: {
        addCandidate: (state, action) => {
            state.push(action.payload);
        },
        updateCandidate: (state, action) => {
            state.map(can => {
                can.englishMark = action.payload.englishMark;
                can.codingMark = action.payload.codingMark;
                can.knowledgeMark = action.payload.knowledgeMark;
            })
        }
    }
});

export const { addCandidate, updateCandidate } = listCandidateSlice.actions;

export const selectCandidate = (state: RootState) => state.listCandidate;

export default listCandidateSlice.reducer;