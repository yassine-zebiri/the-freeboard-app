import { faEllipsisVertical,  faLink, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { useState } from "react";
import './style.css';
import { BaseComponent, ComponentWithHandle, link } from "../interface/baseComponent";
import useComponentSettings from "../hooks/useComponentSettings";
import SettingsComponent from "../settingsCompoent";
import { useAppDispatch } from "../../store/hooks";
import { AddLinksComponent, DeleteLinksComponent, SetLinksComponent } from "../../store/slices/ComponentsSlice";
import FormLink from "./FormLink";



interface Links extends BaseComponent{
    links?:link[];
}

function LinksComponent({component,handle}:ComponentWithHandle<Links>){
    const {
        showSettings,
        setShowSettings,
        settingsRef,
        handleChangeNameComponent,
        handleChangeColorComponent,
        handleDeleteComponent,
        handleDuplicationComponent
    }=useComponentSettings(component.id);
    const dispatch=useAppDispatch();

    const[screen,setScreen]=useState('show');

    const[title,setTitle]=useState<string>('');
    const[site,setSite]=useState<string>('');
    const handleAddLink=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(AddLinksComponent({
            id:component.id,
            title:title,
            site:site
        }));
        setTitle('');
        setSite('');
        setScreen('show');
    }
    const handleDeleteLink=(id:number)=>{
        dispatch(DeleteLinksComponent({
            componentID:component.id,
            linkID:id
        }));
    }

    const[editID,setEditID]=useState<number|null>(null);

    const handleNavigationToEdit = (linkID: number) => {
        setScreen('edit');
        setEditID(linkID);
        const item = component.links?.find(e => e.id === linkID);
        if (item) {
            setTitle(item.title);
            setSite(item.site);
        }
    };
    const handleSetLink=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(SetLinksComponent({
            componentID:component.id,
            linkID:editID,
            title:title,
            site:site
        }));
        setScreen('show');
    }
    const handleCancel=(screen:string)=>{
        setScreen(screen);
        setTitle('');
        setSite('');
    }

    return(
        <div 
            className="base-component rounded"
            style={{
                minWidth:'300px',
                minHeight:'300px',
                top: `${component.top}px`,
                left: `${component.left}px`,
                backgroundColor: `${component.color}`,
            }}
        >
            <div className="header-component" onMouseDown={(e)=>handle(component,e)}>
                <span>name</span>
                <button onClick={()=>setShowSettings(!showSettings)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </div>

            <div className="links-component">
                {screen==='add' &&
                    (
                        <div className=" mb-3 h-48">
                            <FormLink
                                title={title}
                                site={site}
                                setTitle={setTitle}
                                setSite={setSite}
                                onSubmit={handleAddLink}
                                onCancel={()=>handleCancel('show')}
                            />
                           
                            
                        </div>
                    )   
                }
                {screen==='show' &&
                    (
                        <div>
                            <div className="items-links-component">
                                
                                {component.links && component.links.map((item:link,index)=>(
                                    <div className="item-links-component" key={index}>
                                        <a href="ww" target="blank" className="w-full">
                                            <div  className="flex gap-1 font-semibold text-sm">
                                                <label>
                                                    <FontAwesomeIcon icon={faLink} />
                                                </label>
                                                <p >{item.title}</p>
                                            </div>
                                            <span className="font-extralight" style={{fontSize:'12px'}}>
                                                {item.site}
                                            </span>
                                        </a>
                                        <div className="flex gap-1.5">
                                            <button className="btn-links-component">
                                                <FontAwesomeIcon icon={faPenToSquare} onClick={()=>handleNavigationToEdit(item.id)}/>
                                            </button>
                                            <button className="btn-links-component" onClick={()=>handleDeleteLink(item.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 py-3">
                                <button className="border  px-3 py-1.5 text-sm rounded-lg" onClick={()=>handleCancel('add')}>
                                    أضاف
                                </button>
                            </div>
                        </div>
                    )
                }
                {screen==='edit' &&
                    (
                        <div className=" mb-3 h-48">
                            <FormLink
                                type="edit"
                                title={title}
                                site={site}
                                setTitle={setTitle}
                                setSite={setSite}
                                onSubmit={handleSetLink}
                                onCancel={()=>handleCancel('show')}
                            />
                           
                            
                        </div>
                    )
                    
                }
                
            </div>
            {showSettings && (
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
            )}

        </div>
    )
}
export default LinksComponent;