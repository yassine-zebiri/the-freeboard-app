import { createSlice } from "@reduxjs/toolkit"
interface State{
    left:number,
    top:number,
    scale:number
}
const initialState:State={
    left:0,
    top:0,
    scale:1
}
export const BoardSlice=createSlice({
    name:'board',
    initialState:initialState,
    reducers:{
        getPosition:(state,action)=>{
            state.left=action.payload.left;
            state.top=action.payload.top;
            localStorage.setItem('Board',JSON.stringify(state));            
        },
        getScale:(state,action)=>{
            state.scale=action.payload.scale;
            localStorage.setItem('Board',JSON.stringify(state));
        },
        getBoard:(state,action)=>{
            state.left=action.payload.left;
            state.top=action.payload.top;
            state.scale=action.payload.scale;
        },
        getLabel:(state,action)=>{
            state.left=1200-action.payload.left;
            state.top=-action.payload.top;
            state.scale=action.payload.scale;
        }
    }
});


export const{ getPosition,getScale,getBoard,getLabel}=BoardSlice.actions;

export default BoardSlice.reducer;