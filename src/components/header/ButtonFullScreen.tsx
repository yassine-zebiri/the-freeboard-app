import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function HeaderButtonFullScreenComponent(){
    const [isFullScreen,setIsFullScreen]=useState<boolean>(false);
    const handleFullScreen=()=>{
      if(!isFullScreen){
        document.body.requestFullscreen();
        setIsFullScreen(true);
      }else{
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
    return(
        <button 
            className="px-3 py-2 w-full border border-transparent hover:border-white bg-black font-medium hover:bg-gray-500 text-sm" 
            onClick={()=>handleFullScreen()}
        >
            {!isFullScreen? 
                ( <FontAwesomeIcon icon={faExpand} />)
                :
                ( <FontAwesomeIcon icon={faCompress} />) 
            }
           
        </button>
    )
}
export default HeaderButtonFullScreenComponent;