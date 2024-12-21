import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/SearchResults';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SearchResults from './components/SearchDetail';
import FavoritesPage from './components/Favorites';
import ProductView from './components/ProductView';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/search-results" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/favorites" element={<FavoritesPage/>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product-view/:id" element={<ProductView/>} />
      </Routes>
    </Router>
  );
};

export default App;
