import styles from './ProductList.module.css';
import ProductCard from '../ProductCard';

const ProductList = (products)=>{
       return(
              <div className={styles.ProductCard}>
                     {products.map(p=>{
                            <ProductCard key={p.id} product={p} />
                     })}
              </div>
       )
}


export {ProductList};