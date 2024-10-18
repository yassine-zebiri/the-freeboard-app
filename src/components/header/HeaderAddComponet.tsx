import { faArrowUp91, faCaretRight, faFileCirclePlus, faList, faPaperclip, faStopwatch, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { increment } from "../../store/slices/ComponentsSlice";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch } from "../../store/hooks";
import { useRef, useState } from "react";
import useClickOutSide from "../hooks/useClickOutSide";

function HeaderAddComponent(){
    
    const dispatch=useAppDispatch();
    const [isShow,setIsShow]=useState(false);
    const ListRef=useRef<HTMLDivElement|null>(null);
    useClickOutSide(ListRef,()=>setIsShow(false));

    return(
        <div>
            <button 
                onClick={()=>setIsShow(!isShow)}
                style={{borderRadius:'0.25rem'}} 
                className="px-3 py-2 w-full border border-transparent hover:border-white bg-black font-medium hover:bg-gray-500 text-sm"
                >
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                    {/* <span className="px-1.5">العناصر</span> */}
            </button>
            {
            isShow && (
                <>
                <FontAwesomeIcon icon={faCaretRight} className="absolute text-black -top-0.5 right-14 z-10" />
                <div 
                    ref={ListRef} 
                    style={{borderRadius:'0.25rem',right:'3.75rem'}} 
                    className="text-sm absolute p-3 w-60 bg-black top-0 grid grid-cols-2"
                >
                    <button className="flex gap-1 items-center btn "
                        onClick={()=>{dispatch(increment({type:"label"}))}} 
                    >
                        <FontAwesomeIcon icon={faTag} />
                        <span>رقعة</span>
                    </button>
                    <button className="flex gap-1 items-center btn "
                        onClick={()=>{dispatch(increment({type:"note"}))}}    
                    >
                        <FontAwesomeIcon icon={faNoteSticky} />
                        <span>ملاحظة</span>
                    </button>
                    <button className="flex gap-1 items-center btn"
                            onClick={()=>{dispatch(increment({type:"timer"}))}}
                    >
                        <FontAwesomeIcon icon={faStopwatch} />
                        <span>مؤقت</span>
                    </button>
                    <button className="flex gap-1 items-center btn"
                            onClick={()=>{dispatch(increment({type:"counter"}))}}
                    >
                        <FontAwesomeIcon icon={faArrowUp91} />
                        <span>عداد</span>
                    </button>
                    <button className="flex gap-1 items-center btn"
                            onClick={()=>{dispatch(increment({type:"picture"}))}}
                    >
                        <FontAwesomeIcon icon={faArrowUp91} />
                        <span>صورة</span>
                    </button>
                    <button className="flex gap-1 items-center btn"
                            onClick={()=>{dispatch(increment({type:"todo-list"}))}}
                    >
                        <FontAwesomeIcon icon={faList} />
                        <span>قائمة مهام</span>
                    </button>
                    <button className="flex gap-1 items-center btn"
                            onClick={()=>{dispatch(increment({type:"links"}))}}
                    >
                        <FontAwesomeIcon icon={faPaperclip} />
                        <span>روابط</span>
                    </button>
                </div>
                </>
            )}
        </div>
    )
}
export default HeaderAddComponent;