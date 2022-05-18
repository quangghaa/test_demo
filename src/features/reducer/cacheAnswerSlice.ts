import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Answer {
    testId: number;
    question: number;
    choose: number;
}

export interface CacheState {
    testId: number;
    type: string;
    ans: Answer[];
}

const initialState: CacheState[] = [] as CacheState[];

export const cacheAnswerSlice = createSlice({
    name: 'cacheAnswerSlice',
    initialState,
    reducers: {
        addCache: (state, action) => {
            state.push(action.payload);
        },

        addAnswer: (state, action) => {
            state[action.payload.testId].ans.push(action.payload);
        },

        editAnswer: (state, action) => {
            // Question to edit answer
            let ans = state[action.payload.testId].ans.filter((value: any, index:any) => {
                return value.question !== action.payload.question;
            });

            ans.push(action.payload);

            state[action.payload.testId].ans = ans;   
            
        }
    }
});

export const { addCache, addAnswer, editAnswer } = cacheAnswerSlice.actions;

export const selectCacheAnswer = (state: RootState) => state.cacheAnswer;

export default cacheAnswerSlice.reducer;