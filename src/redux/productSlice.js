import { createSlice } from "@reduxjs/toolkit";


const loadProductsFromLocalStorage = () => {
  try {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : []; 
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
    return []; 
  }
};

const saveProductsToLocalStorage = (products) => {
  try {
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu vào localStorage:", error);
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState: loadProductsFromLocalStorage(),
  reducers: {
    addProduct: (state, action) => {
      const updatedState = [...state, action.payload]; 
      saveProductsToLocalStorage(updatedState);
      return updatedState;
    },

    deleteProduct: (state, action) => {
      const updatedState = state.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToLocalStorage(updatedState);
      return updatedState;
    },

    updateProduct: (state, action) => {
      const { id, name, price } = action.payload; 
      const updatedState = state.map((product) =>
        product.id === id ? { ...product, name, price } : product
      );
      saveProductsToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
