import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (params.search) {
      setSearchTerm(params.search);
      dispatch({ type: 'SET_SEARCH_QUERY', payload: params.search }); 
    }
  }, [location.search, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const params = queryString.parse(location.search);
    params.search = searchTerm.trim(); 
    const query = queryString.stringify(params);
    navigate(`?${query}`); 


    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchTerm.trim() });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1, color: '#333' }}>
        Search for Products
      </Typography>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#6200ea',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6200ea',
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          borderRadius: '20px',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: '#3700b3',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default ProductSearch;
