import {createSlice} from '@reduxjs/toolkit'
const initialState ={
    details:{

    }
}
 const detailSlice =createSlice({
 name:'bmwModelDetails',
 initialState,
 reducers:{
    setDetails(state,action){
        state.details= action.payload
    }
 }
})
export const { setDetails } = detailSlice.actions
export default  detailSlice.reducer;
