import { useEffect, useState } from "react";
import styles from './Filters.module.css';
import useDebounce from '../../hooks/useDebounce';


const Filters = ({products, setFilteredProducts})=>{
       const [search, setSearch] = useState(localStorage.getItem('search')||'');
       const [min, setMin] = useState(localStorage.getItem('min')||0);
       const [max, setMax] = useState(localStorage.getItem('max')||1000);
       const [category, setCategory] = useState(
              localStorage.getItem('category')||"",

       );
       const debouncedSearch = useDebounce(search, 500);
       useEffect(()=>{
              localStorage.setItem('search', search);
              localStorage.setItem('min', min);
              localStorage.setItem('max',search);
              localStorage.setItem('category', category);
              let filtered = products.filter((p)=>
                     p.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
              );
              filtered = filtered.filter((p)=>p.price >= min && p.price <= max);
              if (category) filtered = filtered.filter((p)=>p.category === category);
              setFilteredProducts(filtered);

       }, [debouncedSearch, products, max, min, search, category, setFilteredProducts]);
       return(
              <div className={styles.filterBox}>
                     <input type="text" placeholder="searching" value={search} onChange={e=>setSearch(e.target.value)}/>
                     <div>
                            <label htmlFor="">Min Price</label>
                            <input type="number" value={min} onChange={(e)=>setMin(e.target.value)}/>
                     </div>
                     <div>
                            <label htmlFor="">Max Price</label>
                            <input type="number" value={max} onChange={(e)=>setMax(e.target.value)}/>
                     </div>
                     <select value={category} onChange={e=>setCategory(e.target.value)}>
                            <option value="">All</option>
                            {Array.from(new Set(products.map(p=>p.category))).map(c=>{
                                   <option key={c}>{c}</option>
                            })}
                     </select>
              </div>
       )  



}






export {Filters};