import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedProduct: null, 
    searchQuery: '',
    searchResults: [], 
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload; 
        },
            // addProduct: (state, action) => {
            //     state.products.push(action.payload); 
            // },
            addProduct: (state, action) => {
                const { images, ...rest } = action.payload;
                const imageMetadata = images.map((image) => ({
                    name: image.name,
                    size: image.size,
                    type: image.type,
                }));
                
                if (!Array.isArray(state.products)) {
                    state.products = []; 
                }
                
                
                state.products.push({ ...rest, images: imageMetadata });
            },
            
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload; 
        },
        deleteProduct: (state, action) => {
           
            state.products = state.products.filter(product => product._id !== action.payload);
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload; 
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload; 
        },
    },
});

export const { setProducts, addProduct, setSelectedProduct, deleteProduct, setSearchQuery, setSearchResults  } = productSlice.actions;
export default productSlice.reducer;
