import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const searchQuery = useSelector((state) => state.searchQuery);
  const skip = useSelector((state) => state.skip);
  const isLoading = useSelector((state) => state.isLoading);

  const loadProducts = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await fetchProducts(selectedCategory, skip);
      // Filter products based on search query
      const filteredProducts = data.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Dispatch both loaded and filtered products
      dispatch({ type: 'SET_PRODUCTS', payload: filteredProducts });
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch, selectedCategory, skip, searchQuery]);

  // Load products whenever the selected category, skip, or search query changes
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const loadMoreProducts = () => {
    dispatch({ type: 'INCREMENT_SKIP' });
  };

  return (
    <div>
      {isLoading ? ( 
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <Grid container spacing={2}>
          {products.length === 0 ? (
            <Typography variant="h6">No products found.</Typography>
          ) : (
            products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2">{product.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
      {products.length > 0 && !isLoading && ( 
        <Button variant="contained" color="primary" onClick={loadMoreProducts} style={{ marginTop: '20px' }}>
          Load More Products
        </Button>
      )}
    </div>
  );
};

export default ProductList;
