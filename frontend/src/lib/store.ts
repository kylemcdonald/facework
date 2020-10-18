import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ActsConfig, ActId } from "./app-acts-config"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { TraitLabel } from "./face-reader-labels"
import { Nullable } from "./type-helpers"
import { UserMedia } from "./use-user-media"

/* eslint-disable @typescript-eslint/explicit-function-return-type */

const initialActState: ActId = "one"

const actSlice = createSlice({
  name: "act",
  initialState: initialActState as ActId,
  reducers: {
    advance: state => ActsConfig[state].next ?? "final"
  }
})
export const { advance: advanceAct } = actSlice.actions

const traitSlice = createSlice({
  name: "trait",
  initialState: null as Nullable<TraitLabel>,
  reducers: {
    set: (state, action: PayloadAction<Nullable<TraitLabel>>) => action.payload
  }
})
export const { set: setTrait } = traitSlice.actions

const initialUserMediaState: UserMedia = {
  stream: null,
  error: null
}

const userMediaSlice = createSlice({
  name: "userMedia",
  initialState: initialUserMediaState,
  reducers: {
    set: (state, action: PayloadAction<UserMedia>) => action.payload
  }
})
export const { set: setUserMedia } = userMediaSlice.actions

export const store = configureStore({
  reducer: {
    act: actSlice.reducer,
    trait: traitSlice.reducer,
    userMedia: userMediaSlice.reducer
  }
})

export type AppState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
