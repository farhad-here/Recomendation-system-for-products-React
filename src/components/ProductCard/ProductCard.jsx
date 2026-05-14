import styles from './ProductCard.module.css';
import {Link} from 'react-router-dom'
const ProductCard = ({product})=>{

       return(
              <Link to={`/product/${product.id}`} className={styles.card}>
                     <img src={product.image} alt={product.title} />
                     <h4>{product.title}</h4>
                     <p>${product.price}</p>
              </Link>
       )

}

export {ProductCard};