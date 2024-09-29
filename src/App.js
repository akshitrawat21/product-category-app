// 1. Pagination Issue:
// Currently, the app fetches products in batches but doesn't support proper pagination for dynamic search results across all categories.

// 2. Search Optimization:
// The search functionality is basic and only filters products by their title. It doesn't consider descriptions, tags, or other related attributes.

// 3. Category-Based Limitations:
// If a category is selected, search results are limited to that category. There's no full global search across all categories unless 'All' is selected manually.

// 4. No Caching Mechanism:
// The app fetches product data from the API every time "Load More" is clicked, even for previously fetched products. There's no caching to reduce redundant API calls.

// 5. Limited Error Handling:
// Error messages are logged to the console, but there are no user-friendly alerts or feedback when API calls fail.


import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { fetchCategories } from './api';
import CategorySelector from './components/CategorySelector';
import ProductSearch from './components/ProductSearch';
import ProductList from './components/ProductList';
import { Container, Typography, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: data });
    };

    getCategories();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg" style={{ marginTop: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px' }}>
          <Typography variant="h4" gutterBottom align="center" style={{ color: '#333' }}>
            Product Category App
          </Typography>
          <CategorySelector />
          <ProductSearch />
          <ProductList />
        </Container>
      </Router>
    </Provider>
  );
};

export default App;