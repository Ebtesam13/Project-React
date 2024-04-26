import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Pagination, Dropdown, ButtonGroup, Form, InputGroup  } from 'react-bootstrap';
import {useNavigate}  from 'react-router-dom';
import ProductDetailsPage from './DetailsProduct';

import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOrder]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category))
  );
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };

  const LoggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
  console.log(LoggedIn);

  const UserId = JSON.parse(localStorage.getItem('LoggedIn'));
  console.log(UserId);

  const navigate = useNavigate(); 
  const handleAddToCart = (product) => {
    if (LoggedIn) {
      const userId = JSON.parse(localStorage.getItem('UserId'));
      let orders = JSON.parse(localStorage.getItem('Orders')) || [];

      const existingOrderIndex = orders.findIndex((order) => order.userId === userId && !order.completed);

      if (existingOrderIndex !== -1) {
        const existingProductIndex = orders[existingOrderIndex].products.findIndex((p) => p.id === product.id);
        if (existingProductIndex !== -1) {
          orders[existingOrderIndex].products[existingProductIndex].quantity += 1;
        } else {
          orders[existingOrderIndex].products.push({ ...product, quantity: 1 });
        }
      } else {
        orders.push({ userId: userId, products: [{ ...product, quantity: 1 }], completed: false });
      }

      localStorage.setItem('Orders', JSON.stringify(orders));
      setTimeout(() => {
        alert('Done added Product to your Order');
        window.close();
      }, 2000);
     } else {
      navigate('/SignIn');
    }
  };




  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  if (selectedProduct) {
    return <ProductDetailsPage product={selectedProduct} />;
  }
  

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Form className="mb-4">
            <InputGroup className="m-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product by name"
              />
            </InputGroup>
            <Dropdown as={ButtonGroup} className="m-3">
                <Dropdown.Toggle variant="secondary" id="sort-dropdown">
                  Sort by Price
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSortOrderChange('asc')}>Lowest to Highest</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSortOrderChange('desc')}>Highest to Lowest</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="m-3">
              <h5>Filter by Category:</h5>
              {Array.from(new Set(products.map((product) => product.category))).map((category) => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  id={category}
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              ))}
            </div>
          </Form>
        </Col>
        <Col md={9}>
          <h1 className="text-center mb-4">Product Management</h1>
          <Row className="product-list">
            {currentProducts.map((product) => (
              <Col key={product.id} lg={4} className="mb-4">
                <Card className="mt-3">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="product-image"
                    style={{ height: '250px' }}
                  />
                  <Card.Body>
                    <Card.Title className="title-product mt-1">{product.title}</Card.Title>
                    <h4 className="title-category mt-1"  style={{ color: 'red'}}>{product.category}</h4>
                    <button className="btn btn-warning" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <button className="btn btn-info m-1" onClick={() => handleViewDetails(product)}>
                      View Details
                    </button>
                    <hr style={{ color: 'green', borderWidth: '5px' }} />
                    <div className="rating-container">
                      <div className="rating-left">
                        <span className="star">&#9733;</span>
                        <span className="rating-value">{product.rating.rate}</span>
                        <span className="rating-text">({product.rating.count} reviews)</span>
                      </div>
                      <div className="price-right">
                        <span className="price">${product.price}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination className="justify-content-center">
            {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;


