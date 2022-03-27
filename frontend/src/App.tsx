import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import Roles from './pages/roles/Roles';
import RolesCreate from './pages/roles/RolesCreate';
import RolesEdit from './pages/roles/RolesEdit';
import Products from './pages/products/Products';
import ProductCreate from './pages/products/ProductCreate';
import ProductEdit from './pages/products/ProductEdit';
import Orders from './pages/orders/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/:id/edit" element={<UserEdit />} />
          <Route path="roles" element={<Roles />} />
          <Route path="roles/create" element={<RolesCreate />} />
          <Route path="roles/:id/edit" element={<RolesEdit />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
