import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { actsPlan, ActId } from "./acts"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import { TraitLabel } from "./face-reader-labels"
import { Nullable } from "./type-helpers"

const initialActState: ActId = "three"

const actSlice = createSlice({
  name: "act",
  initialState: initialActState as ActId,
  reducers: {
    advance: state => actsPlan[state].next ?? "final"
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
