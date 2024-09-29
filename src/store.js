import { createStore } from 'redux';

const initialState = {
  products: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  skip: 0, // Initialize skip for pagination
  isLoading: false, // Track loading state
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'INCREMENT_SKIP':
      return { ...state, skip: state.skip + 10 }; // Increment skip by 10
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }; // Set loading state
    case 'RESET_SKIP':
      return { ...state, skip: 0 }; // Reset skip to 0
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
