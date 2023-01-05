import "./product.css";
export const Product = ({ item }) => {
  const { thumbnail, brand, title, id } = item;
  return (
    <div key={id} className="productCard">
      <img src={thumbnail} alt={title}></img>
      <h4>{title}</h4>
    </div>
  );
};
