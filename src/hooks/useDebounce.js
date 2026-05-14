import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
       
       const [debounce, setDebounce] = useState(value);
       
       useEffect(()=>{
              const handeler = setTimeout(()=>{
                     setDebounce(value);
              }, delay);
              return()=>{
                     clearTimeout(handeler);
              };
       },[value, delay]);
       return debounce;
}

export {useDebounce};