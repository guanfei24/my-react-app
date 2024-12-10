import { useState } from "react";

export default function Counter(){
    const [count, setCount] = useState(0);
    const countClick=()=>{
        setCount(count-1);
    };
    return (
        <div>
            <button onClick={countClick}>{count}</button>
        </div>
    );
}