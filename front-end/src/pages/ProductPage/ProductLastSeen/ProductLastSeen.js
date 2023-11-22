import { useEffect } from 'react';
import CartComponent from '../../../components/CartComponent/CartComponent';
import { useState } from 'react';
import axios from 'axios';
function ProductLastSeen({ data }) {
  const [products, setProducts] = useState([]);
  const getLastSeenProd = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prods/getRelatedProd`, { data: data });
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data.length > 0) {
      getLastSeenProd(data);
    }
  }, [data]);
  return (
    <>
      <h4 className="text-[26px] leading-[32px] font-bold ">Products you last seen</h4>
      <div className="grid grid-cols-5 mt-6 gap-4">
        {products.map((el, idx) => (
          <CartComponent isSmall={true} key={idx} product={el} />
        ))}
      </div>
    </>
  );
}

export default ProductLastSeen;