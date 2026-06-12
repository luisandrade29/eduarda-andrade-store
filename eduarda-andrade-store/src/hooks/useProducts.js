import { useEffect, useState, useCallback } from 'react';
import { fetchProducts } from '../lib/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
    const onUpdate = () => reload();
    window.addEventListener('products_updated', onUpdate);
    return () => window.removeEventListener('products_updated', onUpdate);
  }, [reload]);

  return { products, loading, error, reload };
}
