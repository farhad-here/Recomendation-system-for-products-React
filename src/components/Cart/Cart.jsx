import { useState } from "react";
import styles from './Cart.module.css';


const Cart = () =>{
       const [cart, setCart] = useState(
              JSON.parse(localStorage.getItem('cart'))||'[]',
       );

       const removeItem = (id) => {
              const newCart = cart.filter((p)=>p.id != id);
              setCart(newCart);
              localStorage.setItem('cart',JSON.stringify(newCart));

       };

       return(
              <div className={styles.cart}>
                     <h2>Cart</h2>
                     {cart.map((item)=>{
                            <div key={item.id} className={styles.item}>
                                   <img src={item.image} alt={item.tite} />
                                   <p>{item.title}</p>
                                   <button onClick={()=>removeItem(item.id)}>Remove</button>
                            </div>
                     })}
              </div>
       )
}





export {Cart};