import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const CategorySelector = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (params.category) {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: params.category });
    }
  }, [dispatch, location.search]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    const params = queryString.stringify({ category });
    navigate(`?${params}`);
  };

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mr: 2 }}>Select a Category:</Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory || ''} // Ensure controlled value
          onChange={handleCategoryChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '10px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6200ea',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6200ea',
            },
            '& .MuiSelect-select': {
              padding: '12px 14px', // Adjust padding to make text fit better
            },
          }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.length === 0 ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            categories.map((category) => (
              <MenuItem key={category.slug} value={category.slug}>
                {category.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelector;
