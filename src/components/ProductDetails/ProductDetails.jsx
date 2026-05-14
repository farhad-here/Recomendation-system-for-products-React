import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import ProductCard from '../ProductCard/ProductCard'
import { useEffect, useState } from 'react';

const ProductDetails = () =>{
       const {id} = useParams();
       const [product, setProduct] = useState();
       const [similar, setSimilar] = useState([]);
       const cart = JSON.parse(localStorage.getItem('cart')||'[]');
       const addToCart = ()=> {
              const newCart = [...cart,product];
              localStorage.setItem('cart',JSON.stringify(newCart));
              alert('Add to Cart!');
       };
       useEffect(()=>{
              fetch('/FakeStore.json')
              .then((r)=>r.json())
              .then((data)=>{
                     const found = data.find((p)=>p.id===Number(id));
                     setProduct(found);
                     const similars = data.filter((p)=>p.category===found.category && p.id !== found.id);
                     setSimilar(similars);
              }).catch((err)=>alert('Error in fetching data',err));
       },[id]);
       if (!product) return <p>Loading</p>;
       return(
              <div className={styles.page}>
                     <img src={product.image} alt={product.title}/>
                     <div className={styles.info}>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <button onClick={addToCart}>add cart</button>
                     </div>
                     <h3>similar Products</h3>
                     <div className={styles.similar}>
                            {similar.map((p)=>{
                                   <productCard key={p.id} />
                            })}
                     </div>
              </div>
       )

}     





export {ProductDetails};