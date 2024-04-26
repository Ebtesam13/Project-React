
import React from 'react';
import Card from 'react-bootstrap';


const CardComponent = (props) => {
 
  return (
    <Card className="mt-3">
    <Card.Img
      variant="top"
      src={props.image}
      className="product-image"
      style={{ height: '250px' }}
    />
    <Card.Body>
        <Card.Title className="title-product mt-1">{props.title}</Card.Title>
        <h4 className="title-product mt-1"  style={{ color: 'red'}}>{props.category}</h4>
        <hr style={{ color: 'green', borderWidth: '5px' }} />
        <div className="rating-container">
            <div className="rating-left">
            <span className="star">&#9733;</span>
            <span className="rating-value">{props.ratingRate}</span>
            <span className="rating-text">({props.ratingCount} reviews)</span>
            </div>
            <div className="price-right">
            <span className="price">${props.price}</span>
            </div>
        </div>
        {/* <button className="btn btn-warning" onClick={()=>}>props.nameBtn</button> */}
    </Card.Body>
    </Card>
  );
};

export default CardComponent;

