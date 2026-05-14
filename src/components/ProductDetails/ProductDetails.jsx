import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState([]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        localStorage.setItem('cart', JSON.stringify([...cart, product]));
        alert('Added to Cart!');
    };

    useEffect(() => {
        fetch('/FakeStore.json')
            .then(r => r.json())
            .then(data => {
                const found = data.find(p => p.id === Number(id));
                setProduct(found);
                setSimilar(data.filter(p => p.category === found.category && p.id !== found.id));
            })
            .catch(err => alert('Error: ' + err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.page}>
            <img src={product.image} alt={product.title} />
            <div className={styles.info}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={addToCart}>Add to Cart</button>
            </div>
            <h3>Similar Products</h3>
            <div className={styles.similar}>
                {similar.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export { ProductDetails };
