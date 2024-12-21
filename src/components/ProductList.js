import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, Box, TableContainer, TableHead, TableRow, IconButton, Typography, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Edit, Delete, StarBorder, Star } from '@mui/icons-material';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setProducts } from '../redux/productSlice';
import SearchBarWithButton from './SearchDetail';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [starredProducts, setStarredProducts] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-images');
        dispatch(setProducts(response.data.data));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();

    const savedStarredProducts = JSON.parse(localStorage.getItem('starredProducts')) || {};
    setStarredProducts(savedStarredProducts);
  }, [dispatch]);

  const handleStarToggle = (_id) => {
    const newStarredProducts = {
      ...starredProducts,
      [_id]: !starredProducts[_id],
    };

    setStarredProducts(newStarredProducts);
    localStorage.setItem('starredProducts', JSON.stringify(newStarredProducts));
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${productToDelete._id}`);
      dispatch(setProducts(products.filter(p => p._id !== productToDelete._id)));
      setOpenDialog(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
          fontWeight: 'bold',
          marginBottom: 0,
          letterSpacing: '0.05em',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        PRODUCTS
      </Typography>
      <br />
      <SearchBarWithButton />
      <br />
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ borderBottom: 'none' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#001eb9', borderBottom: 'none' }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#001eb9', borderBottom: 'none' }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#001eb9', borderBottom: 'none' }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: '#001eb9', borderBottom: 'none' }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product._id || product.sku}>
                    <TableCell sx={{ color: '#969191', fontWeight: 'bold' }}>{product.sku}</TableCell>
                    <TableCell>
                    <Avatar src={`${product?.images[product?.images?.length-1]}`} alt={product.name} variant="rounded" sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: 'bold' }}>{product.name}</TableCell>
                    <TableCell sx={{ color: '#162427', fontWeight: 'bold' }}>$24</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleDeleteClick(product)} sx={{ color: '#001eb9' }}>
                        <Delete />
                      </IconButton>
                      <Link to={`/edit-product/${product._id}`}>
                        <IconButton color="primary" sx={{ color: '#001eb9' }}>
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton
                        color={starredProducts[product.sku] ? 'warning' : 'default'}
                        onClick={() => handleStarToggle(product.sku)}
                        sx={{ color: '#001eb9' }}
                      >
                        {starredProducts[product.sku] ? <Star /> : <StarBorder />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No products available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{
        '& .MuiDialogPaper-root': {
          backgroundColor: '#f7f7f7',
          width: { xs: '90%', sm: '500px' }, 
        },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton sx={{
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '5px',
            marginRight: '10px',
            marginTop: '5px',
          }}>
            <PriorityHighOutlinedIcon />
          </IconButton>
        </Box>
        <DialogTitle sx={{ textTransform: 'uppercase', textAlign: 'center' }}>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>You will not be able to undo this action if you proceed!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" sx={{
            backgroundColor: 'white',
            color: '#001eb9',
            border: '2px solid #001eb9',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary" sx={{
            backgroundColor: '#001eb9',
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#001eb9',
            },
          }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
