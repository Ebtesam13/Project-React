import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../Redux/favoriteSlice';
import { BsHeartFill } from 'react-icons/bs';

const Favorite = () => {
  const favoriteProducts = useSelector((state) => state.favorite.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div className="container pt-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="col">
            <div className="card" >
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                style={{objectFit: 'cover' }}
              />
              <div className="card-body" style={{height:"300px"}}>
                <h5 className="card-title">{product.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                <p className="card-text line-clamp-3">{product.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <p className="card-text text-danger font-weight-bold">${product.price}</p>
                <button
                  onClick={() => handleRemoveFromFavorites(product.id)}
                  className="btn btn-outline-danger"
                >
                  <BsHeartFill className="text-danger" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
