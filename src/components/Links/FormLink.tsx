import { faCheck, faLeftLong, faLink, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormLink({type,title,site,setTitle,setSite,onSubmit,onCancel}:{
    type?:'edit',
    title:string,
    site:string,
    setTitle:(value:string)=>void,
    setSite:(value:string)=>void,
    onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void,
    onCancel:()=>void
}){
    return(
        <form className=" mb-5 flex flex-col gap-3 items-center py-10"
            onSubmit={(e)=>onSubmit(e)}
        >
            <div className="div-1">
                <label>
                    <FontAwesomeIcon icon={faTag} />
                </label>
                <input type="text" placeholder="عنوان ..."
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    required 
                />
            </div>
            <div className="div-1">
                <label>
                    <FontAwesomeIcon icon={faLink} />
                </label>
                <input type="text" placeholder="www.exmple.com" 
                    value={site}
                    onChange={(e)=>setSite(e.target.value)}
                    required
                />
            </div>
            <div className="flex w-full px-7 mt-5 gap-3">
                <button className="btn-links" type="submit">
                    {
                        type==='edit'?(<FontAwesomeIcon icon={faCheck} />):(<FontAwesomeIcon icon={faPlus} />)
                    }
                    
                </button>
                <button className="btn-links"  onClick={()=>onCancel()}>
                    <FontAwesomeIcon icon={faLeftLong} />
                </button>
            </div>
        </form>
    )
}
export default FormLink;