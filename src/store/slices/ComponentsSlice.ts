import { createSlice } from "@reduxjs/toolkit";
import { link } from "../../components/interface/baseComponent";
import { fetchComponents } from "./components/componentsThunk";

interface MyState{
    value:number|string;
    Components:Component[];
    TheWhiteBoard:any,
    loaded:boolean
}
export interface Component{
    id: number;
    left: number;
    top: number;
    content?: string;
    counter?:number;
    path?:string|null;
    todo?:any[];
    links?:link[];
    color:string;
    name:string;
    type:string;
}
const initialState:MyState={
    value: 0,
    Components:[],
    TheWhiteBoard:{
        x:0,
        y:0,
    },  loaded: false,

};

export const ComponentsSlice=createSlice({
    name:'Components',
    initialState,
    reducers:{
        increment:(state,action)=>{
            switch (action.payload.type) {
                case 'note':
                    state.Components.push({
                        id: new Date().getTime(),
                        left: state.TheWhiteBoard.x-150,
                        top: state.TheWhiteBoard.y-150,
                        type: 'note',
                        content:'',
                        name:'',
                        color:'#ef4444'
                    });
                    localStorage.setItem('components',JSON.stringify(state.Components));
                    break;
                case 'label':
                    state.Components.push({
                        id: new Date().getTime(),
                        left: state.TheWhiteBoard.x-150,
                        top: state.TheWhiteBoard.y-150,
                        type: 'label',
                        content:'',
                        name:'.',
                        color:'#ef4444'
                    });
                    localStorage.setItem('components',JSON.stringify(state.Components));
                    break;
                    case 'timer':
                        state.Components.push({
                            id: new Date().getTime(),
                            left: state.TheWhiteBoard.x-150,
                            top: state.TheWhiteBoard.y-150,
                            type: 'timer',
                            content:'',
                            name:'.',
                            color:'#ef4444'
                        });
                        localStorage.setItem('components',JSON.stringify(state.Components));
                        break;
                    case 'counter':
                        state.Components.push({
                            id: new Date().getTime(),
                            left: state.TheWhiteBoard.x-150,
                            top: state.TheWhiteBoard.y-150,
                            type: 'counter',
                            counter:0,
                            name:'',
                            color:'#ef4444'
                        });
                        localStorage.setItem('components',JSON.stringify(state.Components));
                            break;
                    case 'picture':
                        state.Components.push({
                            id: new Date().getTime(),
                            left: state.TheWhiteBoard.x-150,
                            top: state.TheWhiteBoard.y-150,
                            type: 'picture',
                            path:null,
                            name:'',
                            color:'#ef4444'
                        });
                        localStorage.setItem('components',JSON.stringify(state.Components));
                        break;
                    case 'todo-list':
                        state.Components.push({
                            id: new Date().getTime(),
                            left: state.TheWhiteBoard.x-150,
                            top: state.TheWhiteBoard.y-150,
                            type: 'todo-list',
                            todo:[],
                            name:'',
                            color:'#ef4444'
                        });
                        localStorage.setItem('components',JSON.stringify(state.Components));
                        break;
                    case 'links':
                        state.Components.push({
                            id: new Date().getTime(),
                            left: state.TheWhiteBoard.x-150,
                            top: state.TheWhiteBoard.y-150,
                            type: 'links',
                            links:[],
                            name:'',
                            color:'#ef4444'
                        });
                        localStorage.setItem('components',JSON.stringify(state.Components));
                    break;
                default:
                    break;
            }
        },
        setComponent:(state,action)=>{
            state.Components.filter((e)=>e.id==action.payload.id)[0].left=action.payload.x;
            state.Components.filter((e)=>e.id==action.payload.id)[0].top=action.payload.y;
            localStorage.setItem('components',JSON.stringify(state.Components));

        },
        getComponents:(state, action)=>{
            state.Components=action.payload;
        },
        ChangeName:(state,action)=>{
            state.Components.filter((e)=>e.id==action.payload.id)[0].name=action.payload.name;
            localStorage.setItem('components',JSON.stringify(state.Components));

        },
        ChangeColor:(state,action)=>{
            state.Components.filter((e)=>e.id==action.payload.id)[0].color=action.payload.color;
            localStorage.setItem('components',JSON.stringify(state.Components));

        },
        ChangeContentComponent:(state,action)=>{
            state.Components.filter((e)=>e.id==action.payload.id)[0].content=action.payload.content;
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        deleteComponent:(state, action)=>{
            const component=state.Components.find(e=>e.id==action.payload.id);
            if(component){
            const index=state.Components.indexOf(component)
            state.Components.splice(index,1);
            localStorage.setItem('components',JSON.stringify(state.Components));}
        },
        duplicationComponent:(state,action)=>{
            const component=state.Components.filter(e=>e.id===action.payload.id)[0];
            if(component){
                state.Components.push({
                    id:new Date().getTime(),
                    left:component.left-350,
                    top:component.top+100,
                    content:component.content,
                    color:component.color,
                    name:component.name,
                    type:component.type,
                    counter:component.counter,
                    path:component.path,
                    todo:component.todo,
                    links:component.links
                });
                localStorage.setItem('components',JSON.stringify(state.Components));
            }
        },
        duplicationComponentWithImage:(state,action)=>{
            const component=state.Components.filter(e=>e.id===action.payload.id)[0];
            if(component){
                state.Components.push({
                    id:new Date().getTime(),
                    left:component.left-350,
                    top:component.top+100,
                    color:component.color,
                    name:component.name,
                    type:component.type,
                    path:action.payload.path
                });
                localStorage.setItem('components',JSON.stringify(state.Components));
            }
        },
        setTheWhiteBoard:(state,action)=>{
            state.TheWhiteBoard.x=action.payload.x;
            state.TheWhiteBoard.y=action.payload.y;
        },
        ChangeCounterComponent:(state,action)=>{
            state.Components.filter((e)=>e.id==action.payload.id)[0].counter=action.payload.counter;
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        ChangePictureComponent:(state,action)=>{
            if(action.payload.path){
                state.Components.filter((e)=>e.id==action.payload.id)[0].path=action.payload.path;
                localStorage.setItem('components',JSON.stringify(state.Components));
            }
            
        },
        AddTodoListComponent:(state,action)=>{
            const todo=state.Components.filter(e=>e.id==action.payload.id)[0].todo;
            if(todo){
                todo.push({
                    id:new Date().getTime(),
                    title:action.payload.title,
                    description:'',
                    status:'todo'
                })
            }
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        SetTodoListComponent:(state,action)=>{
            const todo=state.Components.filter(e=>e.id==action.payload.componentID)[0].todo;
            if(todo){
                const item=todo.filter(e=>e.id==action.payload.todoID)[0];
                if(action.payload.type=='title'){
                    item.title=action.payload.content;
                }else if(action.payload.type=='description'){
                    item.description=action.payload.content;
                }else if(action.payload.type=='status'){
                    item.status=action.payload.content;
                }
            }
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        DeleteTodoListComponent:(state,action)=>{
            const todo=state.Components.filter(e=>e.id===action.payload.componentID)[0].todo;
            if(todo){
                const index=todo.findIndex(e=>e.id===action.payload.todoID);
                todo.splice(index,1);
            }
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        AddLinksComponent:(state,action)=>{
            const component=state.Components.filter(e=>e.id==action.payload.id)[0].links;
            if(component){
                component.push({
                    id:new Date().getTime(),
                    title:action.payload.title,
                    site:action.payload.site,
                })
            }
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        DeleteLinksComponent:(state,action)=>{
            const item=state.Components.filter(e=>e.id===action.payload.componentID)[0].links;
            if(item){
                const index=item.findIndex(e=>e.id===action.payload.linkID);
                item.splice(index,1);
            }
            localStorage.setItem('components',JSON.stringify(state.Components));
        },
        SetLinksComponent:(state,action)=>{
            const item=state.Components.filter(e=>e.id===action.payload.componentID)[0].links;
            if(item){
                const link=item.filter(e=>e.id===action.payload.linkID)[0];
                link.title=action.payload.title;
                link.site=action.payload.site;

                localStorage.setItem('components',JSON.stringify(state.Components));
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComponents.fulfilled, (state, action) => {
          state.Components = action.payload;
          state.loaded = true; 
        });

      },
});


export const{increment,setComponent,getComponents,
    ChangeName,ChangeColor,deleteComponent,
    duplicationComponent,ChangeContentComponent,
    setTheWhiteBoard,ChangeCounterComponent,
    ChangePictureComponent,duplicationComponentWithImage,
    AddTodoListComponent,SetTodoListComponent,
    DeleteTodoListComponent,AddLinksComponent,
    DeleteLinksComponent,SetLinksComponent
}=ComponentsSlice.actions;
export default ComponentsSlice.reducer;
