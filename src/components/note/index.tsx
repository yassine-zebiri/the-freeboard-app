import { faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { useEffect, useRef} from "react";
import './style.css';
import { useAppDispatch } from "../../store/hooks";
import {ChangeContentComponent } from "../../store/slices/ComponentsSlice";
import { BaseComponent, ComponentWithHandle } from "../interface/baseComponent";
import SettingsComponent from "../settingsCompoent";
import useComponentSettings from "../hooks/useComponentSettings";
interface Note extends BaseComponent{
    content?:string;
}
const NoteComponent=({component,handle}:ComponentWithHandle<Note>)=>{
    const dispatch=useAppDispatch();
    const {
        showSettings,
        setShowSettings,
        settingsRef,
        handleChangeNameComponent,
        handleChangeColorComponent,
        handleDeleteComponent,
        handleDuplicationComponent
    }=useComponentSettings(component.id);

    const textareaRef=useRef<HTMLTextAreaElement|null>(null);// عنصر المحتوى
    const adjustHeight=()=>{// للتعديل ارتفاع العنصر تلقاء عند كتب فيه
        if(textareaRef.current){
            textareaRef.current.style.height='auto';
            textareaRef.current.style.height=`${textareaRef.current.scrollHeight}px`
        }
    }
    const handleChangeContentComponent=(newContent:string)=>{
    dispatch(ChangeContentComponent({id:component.id,content:newContent}))
    }
    useEffect(()=>{
        adjustHeight();
    },[component])
    return(
        <div
        className={`base-component rounded ${showSettings && 'z-50'} `}
            style={
                {
                    minWidth:'300px',
                    minHeight:'300px',
                    top:`${component.top}px`,
                    left:`${component.left}px`,
                    backgroundColor:component.color
                }
            }
        >
           <div className="header-component" onMouseDown={(e)=>handle(component,e)}>
                <span>{component.name} </span>
                <button onClick={()=>setShowSettings(!showSettings)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>
                {showSettings && (
                    <div ref={settingsRef} >
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

            <div className="hover:cursor-default h-full">
                <textarea  name="" id="" 
                ref={textareaRef} 
                onChange={e=>handleChangeContentComponent(e.target.value)}
                value={component.content}
                placeholder="محتوى.." 
                className=" font-semibold w-full bg-transparent h-full outline-none p-1 text-sm overflow-hidden resize-none"
                >
                </textarea>
            </div>
        </div>
    )
}
export default NoteComponent;