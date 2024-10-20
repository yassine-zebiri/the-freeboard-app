import { faCircleUser, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import HeaderButtonFullScreenComponent from "./ButtonFullScreen";
import HeaderAddComponent from "./HeaderAddComponet";
import HeaderSearchLabelComponent from "./HeaderSearchLabelComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function HeaderComponent(){

    return(
        <header 
            style={{width:'60px'}}
        className=" 
        fixed top-0 right-0  z-10 h-full py-3 px-0  hover:cursor-auto">
            <div className=" flex flex-col justify-between items-center h-full">
                <div className="py-10">
                    <div className=' text-4xl cursor-pointer '>
                    <FontAwesomeIcon icon={faCircleUser} className=" rounded-full ring-2 ring-white" />
                    </div>
                </div>
                <div className="h-full w-full px-1.5 relative flex flex-col gap-3">
                   <HeaderAddComponent/>

                    <HeaderSearchLabelComponent/>

                    <HeaderButtonFullScreenComponent/>
                </div>
                <div className="w-full px-1.5 relative flex flex-col gap-3">
                    <a href="https://github.com/yassine-zebiri/the-freeboard-app" target="_blank" className=" w-full text-2xl text-center">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <button             
                        className="px-3 py-2 w-full border border-transparent  font-medium opacity-30 rounded bg-black text-sm" 
                        disabled
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                    <button             
                        className="px-3 py-2 w-full border border-transparent  font-medium opacity-30 rounded bg-black text-sm" 
                        disabled
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                  
                    <code className="w-full text-center text-gray-300" style={{fontSize:'10px'}}>V1.0.0</code>
                </div>
               
            </div>
        </header>
    )
}
export default HeaderComponent;