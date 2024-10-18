import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { faChevronDown, faChevronUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent, ComponentWithHandle } from '../interface/baseComponent';
import useComponentSettings from '../hooks/useComponentSettings';
import SettingsComponent from '../settingsCompoent';
import { useAppDispatch } from '../../store/hooks';
import { ChangeCounterComponent } from '../../store/slices/ComponentsSlice';
interface counter extends BaseComponent{
    counter?:number;
}
function CounterComponent({component,handle}:ComponentWithHandle<counter>){
    //const [counter,setCounter]=useState(0);
    const dispatch=useAppDispatch();

    const ChangeCounter=(type:'incr'|'dicr')=>{
        if(component.counter !== undefined)
        if(type==='incr'){
            dispatch(ChangeCounterComponent({id:component.id,counter:(component.counter +1) }))
            
        }else if(type==='dicr'){
            if(component.counter>0){
                dispatch(ChangeCounterComponent({id:component.id,counter:(component.counter - 1) }))
            }
        }
    }
    const {
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
        className={`base-component rounded ${showSettings && 'z-50'} `}
            style={
                {
                    minWidth:'200px',
                    minHeight:'200px',
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
            <div className="counter-body">
                <div 
                    className='counter-component-btn'
                    onClick={()=>ChangeCounter("incr")}
                >
                    <span >
                        <FontAwesomeIcon icon={faChevronUp} />
                    </span>
                </div>

                <div className='counter-component-number'>
                    <p > {component.counter} </p>
                </div>

                <div 
                    className='counter-component-btn'
                    onClick={()=>ChangeCounter("dicr")}
                >
                    <span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </div>

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
export default CounterComponent;