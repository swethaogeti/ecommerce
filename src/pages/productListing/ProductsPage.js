import { useEffect, useState } from "react";
import { Product } from "../../components/productCard/Product";
import "./productsPage.css";
export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(data.total / 10);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  function handlePageSelect(selectPage) {
    if (selectPage >= 1 && selectPage <= totalPages && page !== selectPage) {
      setPage(selectPage);
    }
  }

  return (
    <div className="productsPage">
      <div className="productsPage__productsList">
        {products.map((item, i) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
      {products.length > 0 && (
        <div className="productsPage__pagination">
          <span
            onClick={() => handlePageSelect(page - 1)}
            className={
              totalPages > 1 ? "" : "productsPage__pagination__disabled"
            }
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => handlePageSelect(i + 1)}
                className={
                  page === i + 1 ? "productsPage__pagination__selected" : ""
                }
              >
                {i + 1}{" "}
              </span>
            );
          })}
          <span
            onClick={() => handlePageSelect(page + 1)}
            className={
              page < totalPages ? "" : "productsPage__pagination__disabled"
            }
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};
