import { useEffect } from "react";

const useClickOutSide=(ref:React.RefObject<HTMLDivElement>,callback:()=>void)=>{
    useEffect(()=>{
        const handleClickOutSide=(e:MouseEvent)=>{
            if
            ( 
                ref.current &&
                !ref.current.contains(e.target as Node)
            ){
                callback();
            }
        };
        document.addEventListener('mousedown',handleClickOutSide);
        return()=>{
            document.removeEventListener('mousedown',handleClickOutSide);
        }
    },[ref,callback])
}
export default useClickOutSide;