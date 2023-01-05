import { useEffect, useState } from "react";
import { Product } from "../../components/productCard/Product";
import "./productsPage.css";
export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  function handlePageSelect(selectPage) {
    if (
      selectPage >= 1 &&
      selectPage <= products.length / 10 &&
      page !== selectPage
    ) {
      setPage(selectPage);
    }
  }

  return (
    <div className="productsPage">
      <div className="productsPage__productsList">
        {products.slice(page * 10 - 10, page * 10).map((item, i) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
      {products.length > 0 && (
        <div className="productsPage__pagination">
          <span
            onClick={() => handlePageSelect(page - 1)}
            className={page > 1 ? "" : "productsPage__pagination__disabled"}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
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
              page < products.length / 10
                ? ""
                : "productsPage__pagination__disabled"
            }
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
};
