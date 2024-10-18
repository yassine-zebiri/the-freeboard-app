import { faChevronDown, faClock,  faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { BaseComponent, ComponentWithHandle } from "../interface/baseComponent";
import useComponentSettings from "../hooks/useComponentSettings";
import SettingsComponent from "../settingsCompoent";
import './style.css';
import { useAppDispatch } from "../../store/hooks";
import { AddTodoListComponent, DeleteTodoListComponent, SetTodoListComponent } from "../../store/slices/ComponentsSlice";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
interface TodoList extends BaseComponent{
    todo?:any[];
}

function TodoListComponent({component,handle}:ComponentWithHandle<TodoList>){
    const {
        showSettings,
        setShowSettings,
        settingsRef,
        handleChangeNameComponent,
        handleChangeColorComponent,
        handleDeleteComponent,
        handleDuplicationComponent
    }=useComponentSettings(component.id);
    const dispatch=useAppDispatch();

    const[input,setInput]=useState<string>('');

    const add=()=>{
        if(input.length>0){
            dispatch(AddTodoListComponent({id:component.id,title:input}));
            setInput('');
        }  
    }

    const handleSetTodoComponent=(id:number,value:string,type:'title'|'description'|'status')=>{
        dispatch(SetTodoListComponent({
            componentID:component.id,
            todoID:id,
            type:type,
            content:value
        }));
    }
    const handleDeleteTodoComponent=(TodoID:number)=>{
        dispatch(DeleteTodoListComponent({
            componentID:component.id,
            todoID:TodoID
        }))
    }
    const[showDecriptionID,setShowDecriptionID]=useState<number|null>(null);

    const ToggleDescription=(id:number)=>{
        setShowDecriptionID(showDecriptionID==id ?null:id);
    }
    return(
        <div 
            className={`base-component rounded ${showSettings && 'z-50'} `}
            style={{
                minWidth:'300px',
                top: `${component.top}px`,
                left: `${component.left}px`,
                backgroundColor: `${component.color}`,
            }}
        >
            <div className="header-component" onMouseDown={(e)=>handle(component,e)}>
                <span>{component.name} </span>
                <button onClick={()=>setShowSettings(!showSettings)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>



            <div className="todoList-component cursor-default">
               

                <div className="bg-red-90 0 py-3 px-2">
                    {component.todo && component.todo.length === 0 && (
                        <div className="flex justify-center w-full items-center p-1.5 my-5">
                            <p className="text-sm font-light">لا يوجد مهام</p>
                        </div>)}

                    <div >
                        {component.todo && component.todo.map((item,index)=>(
                            <div  key={index}>
                                <div className="flex justify-between items-center p-1.5 my-5">
                                    <div className="flex gap-2 w-full">
                                        <div className="py-2 px-3 border rounded-full relative">
                                            {item.status=='todo' && '' }
                                            {item.status==='progres' && (<FontAwesomeIcon className="absolute top-1 left-1" icon={faClock} />)}
                                            {item.status==='done' && (<FontAwesomeIcon className="absolute top-1 left-1" icon={faCircleCheck} />)}
                                        </div>
                                        <input type="text" 
                                            className={`bg-transparent outline-none border-b border-b-transparent focus:border-b-white
                                            font-semibold w-full ${item.status==='done' && 'line-through'}`}
                                        onChange={(e)=>handleSetTodoComponent(item.id,e.target.value,'title')} 
                                        value={item.title}
                                        />
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="btn-todoList rounded-full"
                                            onClick={()=>ToggleDescription(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </button>
                                        <button className="btn-todoList rounded-full text-sm"
                                            onClick={()=>handleDeleteTodoComponent(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                                {showDecriptionID===item.id && (
                                   <div>
                                        <textarea name="" id="" className="w-full min-h-20" 
                                        value={item.description}
                                        onChange={(e)=>handleSetTodoComponent(item.id,e.target.value,'description')}
                                        ></textarea>
                                        <div className="p-1 flex gap-1.5">
                                            <button className={`btn-todoList border ${item.status==='todo' && "bg-slate-50 text-gray-500"} `}
                                                onClick={()=>handleSetTodoComponent(item.id,'todo','status')}
                                            >
                                                todo
                                            </button>

                                            <button className={`btn-todoList border ${item.status==='progres' && "bg-slate-50 text-gray-500"} `}
                                                onClick={()=>handleSetTodoComponent(item.id,'progres','status')}
                                            >
                                                جاري العمل
                                            </button>

                                            <button className={`btn-todoList border ${item.status==='done' && "bg-slate-50 text-gray-500"} `}
                                                onClick={()=>handleSetTodoComponent(item.id,'done','status')}
                                            >
                                                منتهي
                                            </button>

                                        </div>
                                    </div> 
                                )}
                                
                            </div>
                        ))}

                    </div>

                </div>

                <div className="bg-re d-600 p-2 flex justify-between gap-3">
                    <div className="w-full">
                        <input className="text-white outline-none bg-transparent border w-full py-2 px-1 rounded text-sm" 
                        type="text" name="" id="" value={input} placeholder="أكتب هنا..."
                        onChange={(e)=>setInput(e.target.value)} />
                    </div>
                    <button className="btn-todoList border" onClick={()=>add()}>
                        أضاف
                    </button>
                </div>

            </div>



            {showSettings && (
                <div ref={settingsRef}>
                    <SettingsComponent
                    name={component.name}
                    color={component.color}
                    ChangeNameComp={handleChangeNameComponent}
                    ChangeColor={handleChangeColorComponent}
                    DeleteComponent={handleDeleteComponent}
                    DuplicationComponent={handleDuplicationComponent}
                    />
                </div>
            )}
        </div>
    )
}
export default TodoListComponent;