// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';


// export const handleAddToCart = (product) => {
//     const navigate = useNavigate();
//     const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
//     if (LoggedIn) {
//       const userId = JSON.parse(localStorage.getItem('UserId'));
//       let orders = JSON.parse(localStorage.getItem('Orders')) || [];
  
//       const existingOrderIndex = orders.findIndex((order) => order.userId === userId && !order.completed);
  
//       if (existingOrderIndex !== -1) {
//         const existingProductIndex = orders[existingOrderIndex].products.findIndex((p) => p.id === product.id);
//         if (existingProductIndex !== -1) {
//           orders[existingOrderIndex].products[existingProductIndex].quantity += 1;
//         } else {
//           orders[existingOrderIndex].products.push({ ...product, quantity: 1 });
//         }
//       } else {
//         orders.push({ userId: userId, products: [{ ...product, quantity: 1 }], completed: false });
//       }
  
//       localStorage.setItem('Orders', JSON.stringify(orders));
//       alert('Done added Product to your Order');
//     } else {
//         navigate('/SignIn')
//     }
//   };