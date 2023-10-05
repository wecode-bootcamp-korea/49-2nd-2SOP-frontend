import HeroBanner from '../../components/Main/HeroBanner/HeroBanner';
import ProductContainer from '../../components/Main/ProductContainer/ProductContainer';
import Banner from '../../components/Main/Banner/Banner';
import { HOST } from '../../components/Variable';
import React, { useEffect, useState } from 'react';
import './Main.scss';

const Main = () => {
  const [productList, setProductList] = useState([]);

  // useEffect(() => {
  //   fetch('/data/mainMockData.json')
  //     .then(response => response.json())
  //     .then(result => setProductList(result));
  // }, []);

  //fetch 함수(통신을 기다리며...)
  useEffect(() => {
    fetch(`${HOST}/product`, {
      method: 'GET',
    })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(result => {
        // console.log(result.data);
        setProductList(result.data);
      });
  }, []);

  if (productList.length === 0) {
    return null;
  }

  return (
    <div className="main">
      <HeroBanner />
      <ProductContainer productList={productList} />
      <Banner />
    </div>
  );
};

export default Main;
