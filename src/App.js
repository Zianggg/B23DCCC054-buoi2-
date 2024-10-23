import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./component/Sidebar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProduct from './component/EditProduct';
import AddProduct from './component/AddProduct';
import ProductsList from './component/ProductList';
import "./App.css"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
          <Routes>
            <Route path="/products" element={<ProductsList />} />
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
