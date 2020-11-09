import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ActsConfig, ActId, firstActId, finalActId } from "./app-acts-config"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { Nullable } from "./type-helpers"
import { PotentialJob, CompletedJob } from "./job"

/* eslint-disable @typescript-eslint/explicit-function-return-type */

const initialActState = firstActId

const actSlice = createSlice({
  name: "act",
  initialState: initialActState as ActId,
  reducers: {
    advance: state =>
      state !== finalActId ? ActsConfig[state].next : finalActId
  }
})
export const { advance: advanceAct } = actSlice.actions

const currentJobSlice = createSlice({
  name: "currentJob",
  initialState: null as Nullable<PotentialJob>,
  reducers: {
    set: (state, action: PayloadAction<Nullable<PotentialJob>>) =>
      action.payload
  }
})
export const { set: setCurrentJob } = currentJobSlice.actions

const completedJobsSlice = createSlice({
  name: "completedJobs",
  initialState: new Array<CompletedJob>(),
  reducers: {
    push: (state, action: PayloadAction<CompletedJob>) => [
      ...state,
      action.payload
    ]
  }
})
export const { push: pushCompletedJob } = completedJobsSlice.actions

export const store = configureStore({
  reducer: {
    act: actSlice.reducer,
    currentJob: currentJobSlice.reducer,
    completedJobs: completedJobsSlice.reducer
  }
})

export type AppState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
