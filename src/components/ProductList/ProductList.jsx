import styles from './ProductList.module.css';
import { ProductCard } from '../ProductCard/ProductCard';

const ProductList = ({ products }) => {
    return (
        <div className={styles.container}>
            {products.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
};


export {ProductList};