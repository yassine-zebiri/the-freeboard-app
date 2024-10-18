import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { ChangeColor, ChangeName, deleteComponent, duplicationComponent } from "../../store/slices/ComponentsSlice";

function useComponentSettings(ComponentID:number){
    const[showSettings,setShowSettings]=useState<boolean>(false);// للتحقق من ظهور قائمة الاعدادات الخاصة بالعنصر
    const settingsRef = useRef<HTMLDivElement|null>(null);// قائمة الاعدادات
    const dispatch=useAppDispatch();

    const handleChangeNameComponent=(newName:string)=>{
        dispatch(ChangeName({id:ComponentID,name:newName}));
    }
    const handleChangeColorComponent=(newColor:string)=>{
        dispatch(ChangeColor({id:ComponentID,color:newColor}));
    }
    const handleDeleteComponent=()=>{
        dispatch(deleteComponent({id:ComponentID}));
        setShowSettings(false);
    }
    const handleDuplicationComponent=()=>{
        dispatch(duplicationComponent({id:ComponentID}));
    }


    const handleShowSettingsOutside=(e:MouseEvent)=>{//للتحق اذا المستخدم ضغط خارج العنصر
        if
        (
            settingsRef.current &&
            !settingsRef.current.contains(e.target as Node)
        ){
            setShowSettings(false);
        }
    }
    useEffect(()=>{
        if(showSettings){
            document.addEventListener('mousedown',handleShowSettingsOutside);
        }else{
            document.removeEventListener('mousedown',handleShowSettingsOutside);
        }
        return()=>{
            document.removeEventListener('mousedown',handleShowSettingsOutside);
        }
    },[showSettings]);

    return{
        showSettings,
        setShowSettings,
        settingsRef,
        handleChangeNameComponent,
        handleChangeColorComponent,
        handleDeleteComponent,
        handleDuplicationComponent,

    }
}
export default useComponentSettings;