// const handleAddToCart = (product) => {
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
//       console.log('Orders saved:', orders);
//     } else {
//       navigate('/SignIn');
//     }
//   };

// export default handleAddToCart 