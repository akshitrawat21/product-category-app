import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};

export const fetchProducts = async (category, skip = 0, searchQuery = '') => {
  let url = `${BASE_URL}?limit=10&skip=${skip}`;
  
  // Modify URL based on selected category
  if (category) {
    url = `${BASE_URL}/category/${category}?limit=10&skip=${skip}`;
  }
  
  // Adjust URL based on search query
  if (searchQuery) {
    url += `&q=${encodeURIComponent(searchQuery)}`; // Ensure the search query is URL-encoded
  }

  console.log('Fetching Products from URL:', url); // Log the URL for debugging

  const response = await axios.get(url);
  
  // Log the response data
  console.log('Response Data:', response.data); 

  return response.data;
};
