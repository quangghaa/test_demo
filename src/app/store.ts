import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cacheAnswerSlice from '../features/reducer/cacheAnswerSlice';
import listCandidateSlice from '../features/reducer/listCandidateSlice';
import listTestSlice from '../features/reducer/listTestSlice';
import testReducer from '../features/reducer/testSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    test: testReducer,
    listCandidate: listCandidateSlice,
    listTest: listTestSlice,
    cacheAnswer: cacheAnswerSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
