import { useEffect, useState } from "react";
import styles from './Filters.module.css';
import {useDebounce} from '../../hooks/useDebounce.js';


const Filters = ({products, setFilteredProducts})=>{
       const [search, setSearch] = useState(localStorage.getItem('search')||'');
       const [min, setMin] = useState(Number(localStorage.getItem('min')) || 0);
       const [max, setMax] = useState(Number(localStorage.getItem('max')) || 1000);
       const [category, setCategory] = useState(
              localStorage.getItem('category')||"",
       );
       const debouncedSearch = useDebounce(search, 500);
       
       useEffect(()=>{
              localStorage.setItem('search', search);
              localStorage.setItem('min', min);
              localStorage.setItem('max', max);
              localStorage.setItem('category', category);
              
              let filtered = products.filter((p)=>
                     p.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
              );
              
              const minPrice = Number(min) || 0;
              const maxPrice = Number(max) || Infinity;
              filtered = filtered.filter((p)=> p.price >= minPrice && p.price <= maxPrice);
              
              if (category) filtered = filtered.filter((p)=>p.category === category);
              setFilteredProducts(filtered);

       }, [debouncedSearch, products, max, min, category, setFilteredProducts]);
       
       return(
              <div className={styles.filterBox}>
                     <input type="text" placeholder="searching" value={search} onChange={e=>setSearch(e.target.value)}/>
                     <div>
                            <label htmlFor="">Min Price</label>
                            <input type="number" value={min} onChange={(e)=>setMin(Number(e.target.value) || 0)}/>
                     </div>
                     <div>
                            <label htmlFor="">Max Price</label>
                            <input type="number" value={max} onChange={(e)=>setMax(Number(e.target.value) || 1000)}/>
                     </div>
                     <select value={category} onChange={e=>setCategory(e.target.value)}>
                            <option value="">All</option>
                           {Array.from(new Set(products.map(p => p.category))).map(c => (
                            <option key={c} value={c}>{c}</option>
                            ))}
                     </select>
              </div>
       )  
}

export {Filters};
