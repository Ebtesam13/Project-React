import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsProduct = ({ product }) => {
  const navigate = useNavigate();

  const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
  console.log(LoggedIn);

  const UserId = JSON.parse(localStorage.getItem('LoggedIn'));
  console.log(UserId);

  const addToCart = (product) => {
    if (LoggedIn) {
      const userId = JSON.parse(localStorage.getItem('UserId'));
      let orders = JSON.parse(localStorage.getItem('Orders')) || [];

      const existingOrderIndex = orders.findIndex((order) => order.userId === userId && !order.completed);

      if (existingOrderIndex !== -1) {
        const existingProductIndex = orders[existingOrderIndex].products.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
          orders[existingOrderIndex].products[existingProductIndex].quantity += 1;
        } else {
          orders[existingOrderIndex].products.push({ id: product.id, quantity: 1 });
        }
      } else {
        orders.push({ userId: userId, products: [{ id: product.id, quantity: 1 }], completed: false });
      }

      localStorage.setItem('Orders', JSON.stringify(orders));
      // console.log('Orders saved:', orders);
      alert("Done added Product to your Order");
    } else {
      navigate('/SignIn');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product Details</h1>
      <div className="row">
        <div className="col-md-4 border">
          <img src={product.image} alt={product.title} width={300} height={300} />
        </div>
        <div className="col-md-8 border p-4">
          <h2>{product.title}</h2>
          <h4 style={{ color: "#ff9000" }}>Category: {product.category}</h4>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <div className="d-flex align-items-center">
            <div className="rating-left me-3" style={{ color: "#ff9000" }}>
              <span className="star">&#9733;</span>
              <span className="rating-value">{product.rating.rate}</span>
              <span className="rating-text">({product.rating.count} reviews)</span>
            </div>
            <button className="btn btn-warning" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
