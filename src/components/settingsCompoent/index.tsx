import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPalette,  faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClone, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
interface SettingsComp{
    name:string;
    color:string;
    ChangeNameComp(e:string):void;
    ChangeColor(e:string):void;
    DeleteComponent():void;
    DuplicationComponent():void;
}
function SettingsComponent({
    name,color,
    ChangeNameComp,ChangeColor,DeleteComponent,DuplicationComponent
}:SettingsComp){
    return(
        <div   className="note-settings rounded bg-black gap-1.5 
        px-1 py-2 border absolute top-0 -left-56 flex flex-col hover:cursor-default">
            <div className="flex gap-1">
                <div className="">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div>
                    <input
                        className=" bg-transparent border font-semibold px-2 rounded-sm py-1 text-sm"
                        type="text" 
                        name="" 
                        id=""
                        placeholder="اسم الملاحظة.."
                        value={name}
                        onChange={e=>ChangeNameComp(e.target.value)} 
                    />
                </div>
            </div>

            <div 
                className=" flex gap-1 text-sm font-semibold p-2 rounded-lg z-50 hover:bg-gray-500"
                onClick={()=>DeleteComponent()}
            >
                <div>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
                <div>
                    <p>حذف</p>
                </div>
            </div>

            <div className="flex gap-1 note-colors relative  text-sm font-semibold p-2 rounded-lg hover:bg-gray-500">
                <div>
                    <FontAwesomeIcon icon={faPalette} />
                </div>
                <div>
                    <p>اللون</p>
                </div>
                <FontAwesomeIcon className=" absolute left-1.5 top-2.5 text-lg" icon={faAngleLeft} />
                <div className="note-colors-input bg-black py-1.5 px-5 
                    border absolute top-0 -left-24 rounded-l-xl">
                    <input 
                        type="color" 
                        name="" 
                        id=""
                        value={color}
                        onChange={e=>ChangeColor(e.target.value)} 
                    />
                </div>
            </div>

            <div 
                className=" flex gap-1 text-sm font-semibold p-2 rounded-lg hover:bg-gray-500"
                onClick={()=>DuplicationComponent()}
            >
                <div>
                    <FontAwesomeIcon icon={faClone} />
                </div>
                <div>
                    <p>تكرار</p>
                </div>
            </div>

        </div>
    )
}
export default SettingsComponent;