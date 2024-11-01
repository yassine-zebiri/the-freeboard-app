import { useEffect, useRef, useState } from "react";
import alertSound from "../../assets/sounds/alarm-clock-ringing-fascinatedsound.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faEllipsisVertical, faPause, faPlay, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import './style.css';
import SettingsComponent from "../settingsCompoent";
import useComponentSettings from "../hooks/useComponentSettings";
import { BaseComponent, ComponentWithHandle } from "../interface/baseComponent";

const TimerComponent=({component,handle}:ComponentWithHandle<BaseComponent>)=>{
    const[hours,setHours]=useState<number>(0);
    const[minutes,setMinutes]=useState<number>(0);
    const[seconds,setSeconds]=useState<number>(0);
    const[isActive,setIsActive]=useState<boolean>(false);
    const AudioRef=useRef<HTMLAudioElement|null>(null);

    const {
        showSettings,
        setShowSettings,
        settingsRef,
        handleChangeNameComponent,
        handleChangeColorComponent,
        handleDeleteComponent,
        handleDuplicationComponent
    }=useComponentSettings(component.id);


    const ChangeTime=(unit:'seconds'|'minutes'|'hours',type:'incr'|'dicr')=>{
        if(unit==='seconds'){
            if(type==='incr' && seconds<59){
                setSeconds(seconds + 1);
            }else if(type==='dicr' && seconds>0){
                setSeconds(seconds - 1);
            }
        }else if(unit=='minutes'){
            if(type==='incr' && minutes < 59){
                setMinutes(minutes + 1);
            }else if(type==='dicr' && minutes > 0){
                setMinutes(minutes - 1);
            }
        }else if(unit==='hours'){
            if(type==="incr" && hours < 23){
                setHours(hours + 1);
            }else if(type==="dicr" && hours > 0){
                setHours(hours - 1);
            }
        }
    }

    useEffect(()=>{
        let interval: ReturnType<typeof setTimeout> | null = null;
        
        if (isActive && (seconds > 0 || minutes > 0 || hours > 0)) {
            interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                if (minutes > 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    return 59;
                } else if (hours > 0) {
                    setHours(prevHours => prevHours - 1);
                    setMinutes(59);
                    return 59;
                } else {
                    return 0;
                }
                } else {
                return prevSeconds - 1;
                }
            });
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }

        if(seconds===0 && minutes===0 && hours===0){
            clearInterval(interval!);
            console.log('finshed');
            setIsActive(false);
            if(AudioRef.current){
                AudioRef.current.play();
            }
            
        }
        return ()=>clearInterval(interval!);
    },[hours,minutes,seconds,isActive]); 
   
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
            <div className="timer-body">
                <div className="timer-counter cursor-default">
                    <div className="div">
                        <div className="div-2">
                            {!isActive && (
                                <span onClick={()=>ChangeTime('hours','incr')}>
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </span>
                            )}
                        </div>
                        <div className="counter">
                            {hours>=10 ? hours: '0'+hours}
                        </div>
                        <div className="div-2" >
                            {!isActive && (
                                <span onClick={()=>ChangeTime('hours','dicr')}>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="div">
                        <div className="div-2" onClick={()=>setMinutes(minutes +1)}>
                            {!isActive && (
                                <span onClick={()=>ChangeTime('minutes','incr')}>
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </span>
                            )}
                        </div>
                        <div className="counter">
                            {minutes>=10 ? minutes : "0" + minutes}
                        </div>
                        <div className="div-2">
                            {!isActive && (
                                <span onClick={()=>ChangeTime('minutes','dicr')}>
                                <FontAwesomeIcon icon={faChevronDown} />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="div">
                        <div className="div-2">
                            {!isActive && (
                                <span  onClick={()=>ChangeTime('seconds','incr')} >
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </span>
                            )}
                        </div>
                        <div className="counter">
                            {seconds>=10 ? seconds : "0" + seconds }
                        </div>
                        <div className="div-2">
                            {!isActive && (
                                <span onClick={()=>ChangeTime('seconds','dicr')}>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="gap-3 w-full flex justify-center">
                    {(seconds>0 || minutes>0) ? 
                        (
                            <>
                                {isActive ? 
                                (<button className="btn-timer" onClick={()=>setIsActive(!isActive)}>
                                    <FontAwesomeIcon icon={faPause} />
                                </button>)
                                :
                                (<button className="btn-timer" onClick={()=>setIsActive(!isActive)}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>)
                                }
                                <button className="btn-timer">
                                    <FontAwesomeIcon icon={faRotateRight} />
                                </button>
                            </>
                        )
                    :
                        (
                            <button className=" btn-timer">
                                <FontAwesomeIcon icon={faPlay} />
                            </button>
                        )
                    }

                </div>
                <audio ref={AudioRef}>
                    <source  src={alertSound} type="audio/mp3" />
                </audio>
            </div>
            {showSettings && 
                (
                    <div  ref={settingsRef}
>
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
export default TimerComponent;