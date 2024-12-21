import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Card, CardContent, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { addProduct } from '../redux/productSlice';
import axios from 'axios';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const dispatch = useDispatch();
    const existingProducts = useSelector((state) => state.product.products);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        qty: '',
        description: '',
        images: [],
    });

    const [errors, setErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);
    const fileInputRef = React.createRef();

    const validate = () => {
        const newErrors = {};
        const existingSKUs = Array.isArray(existingProducts) ? existingProducts.map((product) => product.sku) : [];
    
        if (!formData.sku) newErrors.sku = 'SKU is required.';
        else if (!/^[a-zA-Z0-9]+$/.test(formData.sku)) newErrors.sku = 'SKU must be alphanumeric.';
        else if (existingSKUs.includes(formData.sku)) newErrors.sku = 'SKU must be unique.';
    
        if (!formData.name) newErrors.name = 'Name is required.';
        else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters long.';
    
        if (!formData.qty) newErrors.qty = 'Quantity is required.';
        else if (formData.qty <= 0) newErrors.qty = 'Quantity must be a positive number.';
    
        if (!formData.description) newErrors.description = 'Description is required.';
        else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters long.';
    
        if (formData.images.length === 0) newErrors.images = 'At least one image is required.';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));

        setImagePreviews((prev) => [...prev, ...previews]);
    };

    const handleAddImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formDataToSend = new FormData();
        formDataToSend.append('sku', formData.sku);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('qty', formData.qty);
        formDataToSend.append('description', formData.description);
        formData.images.forEach((image) => {
            formDataToSend.append('images', image);
        });

        try {
            const response = await axios.post('http://localhost:5000/api/upload-images', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            dispatch(addProduct(formData));
            navigate('/');
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 16px',
            }}
        >
            <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ fontSize: '2.0rem', fontWeight: 'bold', marginBottom: 0, letterSpacing: '0.05em' }}
            >
                PRODUCTS 
                <ChevronRight sx={{ color: '#001eb9', fontSize: '2.5rem', marginX: 0.5 }} />
                <span style={{ color: '#001eb9', fontSize: '1.5rem', }}>Add new product</span>
            </Typography>
            <br />
            <form onSubmit={handleSubmit}>
                <Box display="flex" alignItems="center" mb={4}>
                    <Typography variant="body1" sx={{ mr: 2, minWidth: 80, color: '#162427' }}>SKU</Typography>
                    <TextField
                        variant="outlined"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        error={!!errors.sku}
                        helperText={errors.sku}
                        sx={{
                            width: { xs: '100%', sm: '41%' }, 
                            backgroundColor: '#f7f7f7',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent',
                                },
                                '& input': {
                                    height: '10px',
                                },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 0, 
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#162427',
                            },
                        }}
                    />
                </Box>

                <Box display="flex" mb={4}>
                    <Box display="flex" flexDirection="row" alignItems="center" mr={4} width="100%">
                        <Typography variant="body1" sx={{ mr: 2, minWidth: 80, color: '#162427' }}>Name</Typography>
                        <TextField
                            variant="outlined"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={!!errors.name}
                            helperText={errors.name}
                            fullWidth
                            sx={{
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '& input': {
                                        height: '10px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: 0, 
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#162427',
                                },
                            }}
                        />
                    </Box>

                    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
                        <Typography variant="body1" sx={{ mr: 2, minWidth: 80, color: '#162427' }}>QTY</Typography>
                        <TextField
                            variant="outlined"
                            type="number"
                            value={formData.qty}
                            onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                            error={!!errors.qty}
                            helperText={errors.qty}
                            fullWidth
                            sx={{
                                backgroundColor: '#f7f7f7',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'transparent',
                                    },
                                    '& input': {
                                        height: '10px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderWidth: 0, 
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#162427',
                                },
                            }}
                        />
                    </Box>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#162427' }}>
                        Product Description
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#969191' }}>
                        A small description about the product
                    </Typography>
                    <TextField
                        variant="outlined"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                        sx={{
                            backgroundColor: '#f7f7f7',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 0, 
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#162427',
                            },
                        }}
                    />
                </Box>

                <Card variant="none" sx={{ mb: 4 }}>
                    <CardContent>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="body1" gutterBottom sx={{ color: '#162427' }}> 
                                        Product Images
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#969191' }}>
                                        JPEG, PNG, SVG or GIF
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom sx={{ color: '#969191' }}>
                                        (Maximum file size 50MB)
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8} display="flex" alignItems="center" justifyContent="flex-start">
                                    <Button
                                        variant="text"
                                        color="primary"
                                        sx={{ textDecoration: 'underline', textTransform: 'none', color: '#001EB9' }}
                                        onClick={handleAddImageClick}
                                    >
                                        Add Images
                                    </Button>
                                </Grid>
                            </Grid>
                            {errors.images && (
                                <Typography variant="body2" color="error" gutterBottom>
                                    {errors.images}
                                </Typography>
                            )}
                            {imagePreviews.length > 0 && (
                                <Box display="flex" flexWrap="wrap" sx={{ mt: 2 }}>
                                    {imagePreviews.map((preview, index) => (
                                        <Box key={index} sx={{ width: '100px', height: '100px', marginRight: 1 }}>
                                            <img src={preview} alt={`preview-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </Box>
                    </CardContent>
                </Card>

                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary"  sx={{
                        backgroundColor: '#001eb9',
                        '&:hover': {
                            backgroundColor: '#001eb9',
                        },
                        color: '#fff',
                        textTransform: 'none',
                    }}>
                        Add product
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddProduct;
