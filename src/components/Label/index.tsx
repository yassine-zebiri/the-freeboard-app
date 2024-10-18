import {  faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseComponent, ComponentWithHandle } from "../interface/baseComponent";
import SettingsComponent from "../settingsCompoent";
import useComponentSettings from "../hooks/useComponentSettings";

interface Label extends BaseComponent {
    content?:string;
}
const LabelComponent=({component,handle}:ComponentWithHandle<Label>)=>{
    const 
    {
        showSettings,
        setShowSettings,
        settingsRef,
        handleChangeNameComponent,
        handleChangeColorComponent,
        handleDeleteComponent,
        handleDuplicationComponent    
    }=useComponentSettings(component.id);
    return(
        <div  
            className={`base-component rounded border ${showSettings && 'z-50'} `}
            style={
                {
                    minWidth:'298px',
                    top:`${component.top}px`,
                    left:`${component.left}px`,
                    backgroundColor:component.color
                }
            }
            onMouseDown={(e)=>handle(component,e)}
        >
             <div className="header-component border-none" onMouseDown={(e)=>handle(component,e)}>
                <span>{component.name} </span>
                <button onClick={()=>setShowSettings(!showSettings)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>
            {showSettings && 
                (
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
                )
                }
        </div>
    )
}
export default LabelComponent;
