import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Table, Image, Button } from 'react-bootstrap';
import ProductDetailsPage from '../Products/DetailsProduct';

const Cart = ({ isLoggedIn }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('UserId'));
    const orders = JSON.parse(localStorage.getItem('Orders')) || [];

    const userOrders = orders.filter((order) => order.userId === userId);
    setUserOrders(userOrders);
  }, []);

  const handleDelete = (orderId, productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');

    if (confirmDelete) {
      const updatedOrders = userOrders.map((order) => {
        if (order.userId === orderId) {
          const updatedProducts = order.products.filter((product) => product.id !== productId);
          return { ...order, products: updatedProducts };
        }
        return order;
      });
      localStorage.setItem('Orders', JSON.stringify(updatedOrders));
      setUserOrders(updatedOrders);
    }
  };

  const handleQuantityChange = (orderId, productId, operation) => {
    const updatedOrders = userOrders.map((order) => {
      if (order.userId === orderId) {
        const updatedProducts = order.products.map((product) => {
          if (product.id === productId) {
            if (operation === 'increment') {
              return { ...product, quantity: product.quantity + 1 };
            } else if (operation === 'decrement' && product.quantity > 1) {
              return { ...product, quantity: product.quantity - 1 };
            }
          }
          return product;
        });
        return { ...order, products: updatedProducts };
      }
      return order;
    });
    localStorage.setItem('Orders', JSON.stringify(updatedOrders));
    setUserOrders(updatedOrders);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  if (!isLoggedIn) {
    return <Navigate to="/SignIn" />;
  }

  if (selectedProduct) {
    return <ProductDetailsPage product={selectedProduct} />;
  }

  const calculateOrderTotal = (order) => {
    return order.products.reduce((total, product) => total + product.quantity * product.price, 0);
  };

  const calculateBill = () => {
    const billAmount = userOrders.reduce((totalBill, order) => totalBill + calculateOrderTotal(order), 0);
    return parseFloat(billAmount.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cart Page</h1>
      <div className="mb-4">Total Orders: {userOrders.length}</div>
      {userOrders.map((order, orderIndex) => (
        <div key={orderIndex} className="mb-4">
          {/* <h2>Order ID: {order.userId}</h2> */}
          <Table striped bordered hover className="cart-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Change Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, productIndex) => (
                <tr key={`${orderIndex}-${productIndex}`}>
                  <td>{productIndex+1}</td>
                  <td>{product.title}</td>
                  <td>
                    <Image src={product.image} alt={product.title} className="cart-image" width={70} height={60} />
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button variant="danger" className="mt-1" onClick={() => handleQuantityChange(order.userId, product.id, 'decrement')}>
                      -
                    </Button>
                    <span style={{ fontSize: '25px', margin: "0 10px" }}>|</span>
                    <Button variant="success" className="mt-1" onClick={() => handleQuantityChange(order.userId, product.id, 'increment')}>
                      +
                    </Button>
                  </td>
                  <td>
                    <Button variant="primary" className='m-1' onClick={() => handleViewDetails(product)}>
                      View Details
                    </Button>
                    <Button variant="danger" className='m-1' onClick={() => handleDelete(order.userId, product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end m-2">
            Total Order: {order.products.reduce((total, product) => total + product.quantity, 0)}
          </div>
        </div>
      ))}
      <div className="text-end mb-3">
        <strong>Total Bill: ${calculateBill()}</strong>
        {/* parseFloat(billAmount.toFixed(2)); */}
        <p>Total Bill after taxes: ${(calculateBill() * 0.14 + calculateBill()).toFixed(2)}</p>

      </div>
    </div>
  );
};

export default Cart;
