import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import useClickOutSide from "../hooks/useClickOutSide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { BaseComponent } from "../interface/baseComponent";
import { getLabel } from "../../store/slices/BoardSlice";

function HeaderSearchLabelComponent(){
    const state=useAppSelector(state=>state.Components.Components);
    const dispatch=useAppDispatch();
    const [isShow,setIsShow]=useState(false);
    const ListRef=useRef<HTMLDivElement|null>(null);
    const[Labels,setLabels]=useState<BaseComponent[]>([]);

    useClickOutSide(ListRef,()=>setIsShow(false));


    const handleSearchLabel=(value:string)=>{
        const props=value.trim();
        const regExp=new RegExp(`${props}`,'gi');
        const data=state.filter((e)=>e.type==='label');
        const result=data.filter((e)=>regExp.test(e.name));
        setLabels(result);
    };

    const getLabelComponent=(left:number,top:number)=>{
        dispatch(getLabel({top:top,left:left,scale:1}))
    }

    useEffect(()=>{
        if(state){
            const updateLabel:BaseComponent[]=state.filter(e=>e.type==='label');
            setLabels(updateLabel);
        }
    },[state])
    return(
        <div>
            <button 
                onClick={()=>setIsShow(!isShow)}
                style={{borderRadius:'0.25rem'}} 
                className="px-3 py-2 w-full border border-transparent hover:border-white bg-black font-medium hover:bg-gray-500 text-sm"
            >

                <FontAwesomeIcon icon={faMagnifyingGlass} />
                {/* <span className="px-1.5">البحث</span> */}

            </button>


            {isShow && 
                (
                <>
                    <FontAwesomeIcon icon={faCaretRight} className="absolute text-black top-16  right-14" />

                    <div 
                        ref={ListRef}  
                        style={{borderRadius:'0.25rem',right:'3.75rem'}}
                        className="text-sm absolute p-3 w-56 bg-black top-16 "
                    >
                        <input type="text" name="" id="" 
                        placeholder="ابحث عن رقعة.."
                        className=" bg-transparent border rounded-sm w-full py-1 px-2 text-sm font-medium"
                        onChange={(e)=>handleSearchLabel(e.target.value)} 
                        />
                        <div className="flex flex-col gap-1 mt-3 overflow-auto" style={{maxHeight:'300px'}}>
                            {
                            Labels.length>0 ?
                            Labels.map((item,index)=>(
                                <div key={index} className="py-2 px-3"
                                    style={{backgroundColor:item.color}}
                                    onClick={()=>getLabelComponent(item.left,item.top)}
                                >
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                            ))
                            :
                            (
                                <div className=" text-center p-3 font-medium text-sm">
                                    لا توجد نتائج
                                </div>
                            )
                            }
                        </div>
                    </div>
                </>
                )
            }
        </div>
    )
}
export default HeaderSearchLabelComponent;