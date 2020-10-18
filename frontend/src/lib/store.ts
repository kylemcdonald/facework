import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ActsConfig, ActId } from "./app-acts-config"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { TraitLabel } from "./face-reader-labels"
import { Nullable } from "./type-helpers"

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

export const store = configureStore({
  reducer: { act: actSlice.reducer, trait: traitSlice.reducer }
})

export type AppState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
