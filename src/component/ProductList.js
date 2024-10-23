import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter products based on the search query
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get the products for the current page
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = (id) => dispatch(deleteProduct(id));

  const renderProductItem = (product) => (
    <div key={product.id} className="product-item">
      <span>
        {product.name} - {product.price} VND
      </span>
      <div className="product-actions">
        <button onClick={() => handleDelete(product.id)}>Xóa</button>
        <Link to={`/edit-product/${product.id}`}>
          <button className="edit-btn">Chỉnh sửa</button>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <h2>Danh Sách Hàng Hóa</h2>

      {/* Header with search bar and add product button */}
      <div className="header">
        <SearchBar onSearch={setSearchQuery} />
        <button
          className="add-btn"
          onClick={() => navigate("/add-product")}
        >
          Thêm Hàng Hóa
        </button>
      </div>

      {/* Product list or no results message */}
      {currentProducts.length > 0 ? (
        currentProducts.map(renderProductItem)
      ) : (
        <p>Không tìm thấy hàng hóa nào!</p>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trang trước
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default ProductList;
