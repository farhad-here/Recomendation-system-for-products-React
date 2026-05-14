import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Filters } from '../components/Filters/Filters';
import { ProductList } from '../components/ProductList/ProductList';

const Home = () => {
    const [products, setProducts] = useState(() => {
        const cached = localStorage.getItem('products');
        return cached ? JSON.parse(cached) : [];
    });
    const [filtered, setFiltered] = useState(products);

    useEffect(() => {
        if (products.length === 0) {
            fetch('/FakeStore.json')
                .then(r => r.json())
                .then(data => {
                    setProducts(data);
                    localStorage.setItem('products', JSON.stringify(data));
                    setFiltered(data);
                });
        }
    }, [products.length]);

    return (
        <div className={styles.container}>
            <div className={styles.filterSection}>
                <h1 className={styles.title}>FAKE STORE</h1>
                <Filters products={products} setFilteredProducts={setFiltered} />
            </div>
            <div className={styles.productSection}>
                <ProductList products={filtered} />
            </div>
        </div>
    );
};




export { Home };