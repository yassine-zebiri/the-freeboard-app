
export interface BaseComponent  {
    id: number;
    left: number;
    top: number;
    color:string;
    name:string;
    type:string;
}

export interface ComponentWithHandle <T extends BaseComponent>{
    component:T;
    handle:(component:T,e:React.MouseEvent<HTMLDivElement>)=>void;
}

export interface link{
    id:number;
    title:string;
    site:string;
}