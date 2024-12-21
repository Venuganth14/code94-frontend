import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Button, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setSearchQuery } from '../redux/productSlice';

const SearchDetail = () => {
    const [searchQuery, setSearchQueryState] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const searchResults = useSelector((state) => state.product.searchResults);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQueryState(query);
        dispatch(setSearchQuery(query));
    };

    const handleSearchClick = () => {
        console.log("Search query:", searchQuery);
        if (!searchQuery.trim()) {
            console.log('Search query is empty.');
            return;
        }

        const filteredProducts = products.filter((product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        console.log("Filtered Products:", filteredProducts);
        dispatch(setSearchResults(filteredProducts));

        
        navigate('/search-results');
    };

    const handleNewProductClick = () => {
        navigate('/add-product');
    };

    const handleFavoritesClick = () => {
        navigate('/favorites');
    };

    return (
        <div>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ margin: '0 auto', padding: '0 20px' }}>
                <TextField
                    label="Search for products"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                        width: '500px',
                        height: 40,
                        backgroundColor: '#f7f7f7',
                        borderRadius: 2,
                        '& .MuiInputBase-input': {
                            color: '#969191',
                            padding: '6px 10px',
                        },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            border: 'none',
                            '& fieldset': {
                                border: 'none',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            transform: 'translate(14px, 10px) scale(1)',
                            color: '#969191',
                            transition: 'transform 0.3s ease',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            transform: 'translate(14px, -8px) scale(0.75)',
                        },
                        '& .MuiInputAdornment-root': {
                            padding: '0',
                            backgroundColor: '#001eb9',
                            borderRadius: '12px',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={{ borderRadius: '12px' }}>
                                <IconButton
                                    color="primary"
                                    onClick={handleSearchClick}
                                    sx={{
                                        padding: '10px',
                                        color: '#fff',
                                        fontSize: '14px',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <SearchIcon sx={{ fontSize: '20px' }} />
                                    <span style={{ marginLeft: '5px', fontSize: '14px' }}>Search</span>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box display="flex" alignItems="center" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewProductClick}
                        sx={{
                            backgroundColor: '#001eb9',
                            '&:hover': {
                                backgroundColor: '#001eb9',
                            },
                            color: '#fff',
                            width: 'auto',
                        }}
                    >
                        New Product
                    </Button>
                    <IconButton
                        color="primary"
                        onClick={handleFavoritesClick}
                        sx={{
                            border: '2px solid #001eb9',
                            padding: '6px 10px',
                            color: '#001eb9',
                            borderRadius: '4px',
                        }}
                    >
                        <StarIcon sx={{ fontSize: '24px' }} />
                    </IconButton>
                </Box>
            </Box>

            {searchQuery.trim() && (
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '16px' }}>
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found for "{searchQuery}"
                </Typography>
            )}
        </div>
    );
};

export default SearchDetail;