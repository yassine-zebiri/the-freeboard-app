import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { BaseComponent, ComponentWithHandle } from "../interface/baseComponent";
import useComponentSettings from "../hooks/useComponentSettings";
import { useAppDispatch } from "../../store/hooks";
import { ChangePictureComponent, duplicationComponentWithImage } from "../../store/slices/ComponentsSlice";
import SettingsComponent from "../settingsCompoent";

interface Picture extends BaseComponent{
    path?:string|null;
}

function PictureComponent({component,handle}:ComponentWithHandle<Picture>){
    const [pic, setPicture] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const {
      showSettings,
      setShowSettings,
      settingsRef,
      handleChangeNameComponent,
      handleChangeColorComponent,
      handleDeleteComponent,
    } = useComponentSettings(component.id);
  
    const [db, setDB] = useState<IDBDatabase | null>(null);
  
    useEffect(() => {
      const openRequest = indexedDB.open("ImageDB", 1);
  
      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;
        db.createObjectStore("images", { keyPath: "id" });
      };
  
      openRequest.onsuccess = () => {
        setDB(openRequest.result);
      };
  
      openRequest.onerror = () => {
        console.error("Error opening IndexedDB");
      };
    }, []);
  
    const storeImage = (imageId: string, imageData: string) => {
      if (db) {
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
  
        store.put({ id: imageId, data: imageData });
        transaction.onerror = () => {
          console.error("Error storing image!");
        };
      }
    };
  
    const retrieveImage = (imageId: string, callback: (data: string) => void) => {
      if (db) {
        const transaction = db.transaction("images", "readonly");
        const store = transaction.objectStore("images");
  
        const request = store.get(imageId);
  
        request.onsuccess = () => {
          if (request.result) {
            callback(request.result.data);
          } else {
            console.log("Image not found");
          }
        };
  
        request.onerror = () => {
          console.error("Error retrieving image");
        };
      }
    };
    const deleteImage = (imageId: string) => {
        if (db) {
            const transaction = db.transaction("images", "readwrite");
            const store = transaction.objectStore("images");

            store.delete(imageId);

            transaction.oncomplete = () => {
                console.log("Image deleted successfully!");
                setPicture(null); 
                dispatch(ChangePictureComponent({ id: component.id, path: null }));
            };

            transaction.onerror = () => {
                console.error("Error deleting image");
            };
        }
    };
    const DeleteComponentWithImage=()=>{
        if(component.path){
            deleteImage(component.path);
        }
        handleDeleteComponent();
        
    }
    const handleDuplicationComponentWithImage=()=>{
      if(component.path){
          const imageId = new Date().getTime().toString();
          storeImage(imageId, (pic as string) );
          dispatch(duplicationComponentWithImage({id:component.id,path:imageId}));
      }
    }
  
    const ChangePicture = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
  
      if (file && e.target) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const result = e.target?.result as string;
  
          const imageId = new Date().getTime().toString();
  
          storeImage(imageId, result);
  
          dispatch(ChangePictureComponent({ id: component.id, path: imageId }));
  
          setPicture(result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    useEffect(() => {

      if (component.path) {
        retrieveImage(component.path, (data) => {
          setPicture(data);
        });
      }
    }, [component.id, component.path, db, dispatch]);
  
    return (
      <div
        style={{
            minWidth:'300px',
            top: `${component.top}px`,
            left: `${component.left}px`,
            backgroundColor: `${component.color}`,
        }}
        className={`base-component rounded ${showSettings && 'z-50'}`}
      >
        <div className="header-component" onMouseDown={(e) => handle(component, e)}>
          <span>{component.name}</span>
          <button onClick={() => setShowSettings(!showSettings)}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        <div >
          {pic!=null ? (
            <div className=" overflow-hidden rounded-b">
              <img
                style={{
                  minWidth: "300px",
                  maxWidth: "400px",
                }}
                className="block cursor-default select-none"
                src={pic}
                alt="Uploaded"
              />
            </div>
          ) : (
                <div className="p-3">
                    <label className="p-3 block border-white border border-dotted rounded text-center" htmlFor="pic">
                        رفع صورة
                    </label>
                    <input onChange={(e) => ChangePicture(e)} className="hidden" type="file" name="pic" id="pic" accept="image/*" />
                </div>
          )}
        </div>
        {showSettings && (
          <div ref={settingsRef}>
            <SettingsComponent
              name={component.name}
              color={component.color}
              ChangeNameComp={handleChangeNameComponent}
              ChangeColor={handleChangeColorComponent}
              DeleteComponent={DeleteComponentWithImage}
              DuplicationComponent={handleDuplicationComponentWithImage}
            />
          </div>
        )}
      </div>
    );
  };
  
export default PictureComponent;