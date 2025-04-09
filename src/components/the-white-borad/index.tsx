import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setComponent, setTheWhiteBoard } from '../../store/slices/ComponentsSlice';
import NoteComponent from '../note';
import { getPosition, getScale } from '../../store/slices/BoardSlice';
import LabelComponent from '../Label';
import TimerComponent from '../Timer';
import { BaseComponent } from '../interface/baseComponent';
import CounterComponent from '../counter';
import PictureComponent from '../picture';
import { faArrowsToDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TodoListComponent from '../TodoList';
import LinksComponent from '../Links';
import { fetchComponents } from '../../store/slices/components/componentsThunk';
import { RootState } from '../../store/store';

interface Board{
    left:number;
    top:number;
    scale:number;
}

function TheWhiteBorad(){
    const Components:BaseComponent[]=useAppSelector((state:RootState)=>state.Components.Components);
    /**
     * const TheWhiteBoard=useAppSelector((state)=>state.Components.TheWhiteBoard);
     */
    const Board:Board=useAppSelector((state)=>state.Board)
    
    const dispatch=useAppDispatch();


    useEffect(() => {
        dispatch(fetchComponents() as any);
      }, [dispatch]);
    //console.log(TheWhiteBoard);
    
  /**
   * const[Components,setComponent]=useState<Component[]>([
   * {id:1,left:'0px',top:'0px',txt:'hello word!'},
   * {id:1,left:'500px',top:'500px',txt:'hello!'}
   * ]
   * )// المكونات أو العناصر
   */

    const[isDraggedElement,setIsDraggedElement]=useState<boolean>(false);//تحقق من حالة اذا كان يحدث السحب الان
    const[Element,setElement]=useState<BaseComponent|null>(null);// العنصر المسحوب حاليا

    const[dragOffsetX,setDragOffsetX]=useState<number>(0)// للحصول على إزاحة للمكون أو للعنصر على محورالأفقي
    const[dragOffsetY,setDragOffsetY]=useState<number>(0)

    const whiteBoradRef=useRef<HTMLDivElement|null>(null);
    const ContainerRef=useRef<HTMLDivElement|null>(null)
    const[isDragginfBoard,setIsDraggingBoard]=useState<boolean>(false)//تحقق اذا كان يتم تحرريك اللوحة البيضاء

   // const[scale,setScale]=useState(1)// مقياس للتكبيير و تصغير الشاشة أو اللوحة البيضاء

    

    const getCenter=()=>{
        //عند اضافة أي عنصر يتم اضافته في وسط الشاشة بالنسبة للمستخدم مهم كان موقع اللوحة
        if(whiteBoradRef.current && ContainerRef.current){
        
            const whiteboardRect = whiteBoradRef.current.getBoundingClientRect();
            const containerRect = ContainerRef.current.getBoundingClientRect();
            
            // حساب الموقع الوسطي
            const centerX = containerRect.width / 2 - whiteboardRect.left ;
            const centerY = containerRect.height / 2 - whiteboardRect.top ;
            dispatch(setTheWhiteBoard({
                x:centerX/Board.scale,
                y:centerY/Board.scale,
            }))
        }
    }
    const HandleMouseDownComponent=(component:BaseComponent,e:React.MouseEvent<HTMLDivElement>)=>{

        document.body.style.cursor="grabbing";
        const currentElement=e.target as HTMLDivElement;
        const rect=currentElement.getBoundingClientRect();
        setDragOffsetX((e.clientX-rect.left)/Board.scale);
        setDragOffsetY((e.clientY-rect.top)/Board.scale);
        
        setIsDraggedElement(true);    
        setElement(component);
        
        
    }

    const HandleMouseDown=(e:React.MouseEvent<HTMLDivElement>)=>{
        if(e.target === whiteBoradRef.current || e.target === ContainerRef.current){
            document.body.style.cursor="grabbing";
            
            setIsDraggingBoard(true);
            
            setDragOffsetX(e.clientX);//ازاحة االلوحة البيضاء على المحور الأفقي 
            setDragOffsetY(e.clientY);
        }
    }
    const HandleMouseMove=(e:MouseEvent)=>{
        if(isDraggedElement ){
            if(whiteBoradRef.current && Element!=null){
                const WhiteBoaradRect=whiteBoradRef.current.getBoundingClientRect();
                let x=(e.clientX- WhiteBoaradRect.left)/Board.scale-dragOffsetX;
                let y= (e.clientY- WhiteBoaradRect.top)/Board.scale-dragOffsetY;
                x=Math.round((x/15))*15;//تم استخدام دالة للتقريب وذلك للتحسين و تسهيل تحريك العناصر ومحذتهم مع بعص
                y=Math.round(y/15)*15;
                dispatch(setComponent({id:Element?.id,x:x,y:y}));

            }

        }else if(isDragginfBoard){
            const deltaX = e.clientX - dragOffsetX;
            const deltaY = e.clientY - dragOffsetY;
            if(whiteBoradRef.current && ContainerRef.current && whiteBoradRef!=null){
                const whiteBorad=whiteBoradRef.current;
                const x=Math.round((whiteBorad.offsetLeft+deltaX));
                const y=Math.round(whiteBorad.offsetTop+deltaY);

                /* const x=whiteBorad.offsetLeft+deltaX;
                const y=whiteBorad.offsetTop+deltaY; */
                
               /*  const maxTop=ContainerRef.current.clientHeight-whiteBorad.clientWidth;
                const maxLeft=ContainerRef.current.clientWidth-whiteBorad.clientWidth;
                if(y<=(-maxTop*0.1) && y>=(maxTop)){
                    whiteBorad.style.top=y+"px";
                }
                if(x<=(-maxLeft*0.1) && x>=maxLeft){
                    whiteBorad.style.left=x+"px";
                } */
                    whiteBorad.style.top=y+"px";
                    whiteBorad.style.left=x+"px";
                    dispatch(getPosition({left:x,top:y}))
                    
    
            }
            
            setDragOffsetX(e.clientX);
            setDragOffsetY(e.clientY);
            
            
        } 
    }
    const handleMouseUp=()=>{
        document.body.style.cursor="grab";

        setIsDraggedElement(false);
        setIsDraggingBoard(false)
    }
    const handleWheel=(e:WheelEvent)=>{
        if(whiteBoradRef.current){
            e.preventDefault();
            const scaleAmount=-e.deltaY *0.001;
            const newScale=Math.min(Math.max(0.1,Board.scale+scaleAmount),1.5);
            dispatch(getScale({scale:newScale}));
            //setScale(newScale);

            if(whiteBoradRef.current)
            //dispatch(getPosition({scale:newScale}));
            whiteBoradRef.current.style.transform=`scale(${newScale})`;
        }
    }
    const Load=()=>{

       const a=localStorage.getItem('Board');
       if(a && whiteBoradRef.current){
            const d=JSON.parse(a);
            whiteBoradRef.current.style.left=`${d.left}px`;
            whiteBoradRef.current.style.top=`${d.top}px`;
            whiteBoradRef.current.style.transform=`scale(${d.scale})`;
        
       }


    }

   
  
    useEffect(()=>{
        document.addEventListener('mousemove',HandleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('wheel',handleWheel,{passive:false});
        getCenter();
        
        return()=>{
        document.removeEventListener('mousemove', HandleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('wheel',handleWheel);
        getCenter();


        }
    },[isDraggedElement,Components,Element,isDragginfBoard,dragOffsetX,dragOffsetY,Board.scale]);
    useEffect(()=>{
        Load();
        return()=>{
            Load();
        }
    },[])
    
    return(
        <div id='Container' ref={ContainerRef} onMouseDown={HandleMouseDown} >

            <div id='WhiteBorad'   style={{left:`${Board.left}px`,top:`${Board.top}px`,transform:`scale(${Board.scale})`}} ref={whiteBoradRef}>
                {Components.map((component,index)=>{
                    switch (component.type) {
                        case 'note':
                          return  <NoteComponent component={component} key={index} handle={HandleMouseDownComponent} />
                        case 'label':
                            return <LabelComponent  component={component} key={index} handle={HandleMouseDownComponent} />        
                        case 'timer':
                            return <TimerComponent component={component} key={index} handle={HandleMouseDownComponent} />
                        case 'counter':
                            return <CounterComponent component={component} key={index} handle={HandleMouseDownComponent} />  
                        case 'picture':
                            return <PictureComponent component={component} key={index} handle={HandleMouseDownComponent} /> 
                        case 'todo-list':
                            return <TodoListComponent component={component} key={index} handle={HandleMouseDownComponent} />  
                        case 'links':
                            return <LinksComponent component={component} key={index} handle={HandleMouseDownComponent} />            
                        default:
                            break;
                    }
                })}
                

            </div>
            <div className='px-3 py-2 border border-black rounded-lg text-lg fixed bottom-5 left-5 cursor-pointer'
            style={{backgroundColor:'#242424'}}
                onClick={()=> {
                        dispatch(getPosition({left:0,top:0}))
                        dispatch(getScale({scale:1}))
                    }
                }
            >
                <FontAwesomeIcon icon={faArrowsToDot} />
            </div>
      </div>
    )
}
export default TheWhiteBorad;
