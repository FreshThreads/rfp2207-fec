import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import http from './HttpReqs';
import { IdContext } from '../App.jsx'

var RelatedProducts = (props) => {
  const [mainProductDetail, setDetail] = useState({});
  let id = useContext(IdContext);

  useEffect(() => {
    http.productReq(id)
      .then((res) => setDetail(res.data))
  }, [])

  return (
    <div id="RIC-related-items">
      <p>related products here</p>
      <div id="RIC-ri-card-container">
        {props.data.map((product) => {
          return <ProductCard main={mainProductDetail} key={product.id} product={product} mode={'related-item'}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts;