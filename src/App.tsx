
import { useEffect } from 'react';
import './App.css'
import HeaderComponent from './components/header';
import TheWhiteBorad from './components/the-white-borad';
//import { useAppDispatch} from './store/hooks';
/* import { getComponents } from './store/slices/ComponentsSlice';
import { getBoard } from './store/slices/BoardSlice'; */


function App() {
//  const state=useAppSelector(state=>state)
/*   const dispatch=useAppDispatch();
  const i=localStorage.getItem('components');
  const a=localStorage.getItem('Board'); */
 // const[isLoading,setisL]=useState(true);
  useEffect(() => {
    const registerPeriodicSync = async () => {
        if ('serviceWorker' in navigator && 'PeriodicSyncManager' in window) {
            const registration:any = await navigator.serviceWorker.ready;
            try {
                await registration.periodicSync.register({
                    tag: 'my-local-sync',
                    minInterval: 24 * 60 * 60 * 1000, // 24 ساعة
                });
                console.log('Periodic Sync registered');
            } catch (error) {
                console.error('Periodic Sync registration failed:', error);
            }
        }
    };

    registerPeriodicSync();
}, []);

 /*  useEffect(()=>{

    if(i ){
      
      dispatch(getComponents(JSON.parse(i)));
      setisL(true)

      
    }
    if(a){
      dispatch(getBoard(JSON.parse(a)));


    } 
    setisL(true)

    return()=>{
      if(i ){     
        dispatch(getComponents(JSON.parse(i)));
      }
      if(a){
        dispatch(getBoard(JSON.parse(a)));

      } 
      setisL(true)

    }
    
  },[]) */

if(true){
  return (
    
    <>
    <HeaderComponent/>
    <TheWhiteBorad/>
    </>
   )
}else{
  return(
    <div>
      <h1 className='text-xl font-bold text-center bg-red-300 p-5 '>Loading</h1>
    </div>
  )
}
  
}

export default App
