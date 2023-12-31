import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import { addProdList } from '../../slice/product.slice';
import { useState } from 'react';
import Lottie from 'lottie-react';
import successAnimate from '../../assets/animationJson/animateSuccess.json';
import http from '../../utils/http';
function CartComponent({ isSmall = false, product, userId, userProducts, userLikes, refreshUserData }) {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowSuccess = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1700);
  };
  const handleAddProd = async (e) => {
    e.preventDefault();
    let flag = 0;
    handleShowSuccess();
    setIsLoading(true);
    console.log(userProducts);
    userProducts.forEach((element) => {
      if (element.productId === product._id) {
        element.quantity += 1;
        flag = 1;
      }
    });
    if (flag === 1) {
      dispatch(addProdList({ userId: userId, newData: userProducts, isChanged: false }))
        .then(() => {
          refreshUserData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error dispatching action:', error);
          setIsLoading(false);
        });
    } else {
      const data = {
        userId: userId,
        newData: [...userProducts, { productId: product._id, quantity: 1 }],
        isChanged: true,
      };

      dispatch(addProdList(data))
        .then(() => {
          refreshUserData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error dispatching action:', error);
          setIsLoading(false);
        });
    }
  };
  const handleAddLikedProd = async (e) => {
    e.preventDefault();
    let flag = 0;
    userLikes?.forEach((el, idx) => {
      if (el === product._id) {
        flag = 1;
      }
    });
    if (flag === 1) {
      const idx = userLikes.indexOf(product._id);
      const newArr = userLikes;
      newArr.splice(idx, 1);
      try {
        const response = await http.patch(`users/${userId}`, { likes: newArr }, { withCredentials: true });
        await refreshUserData();
        if (response.data.status === 'success') {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let newArr = [...userLikes, product._id];
      try {
        const response = await http.patch(`users/${userId}`, { likes: newArr }, { withCredentials: true });
        await refreshUserData();
        if (response.data.status === 'success') {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Link
      to={`/product/${product?._id}`}
      className="relative bg-white border-[1px] border-gray-300 animate-slideTopDown cursor-pointer transition-all rounded-lg"
    >
      <div className={` overflow-hidden`}>
        <div
          style={{ backgroundImage: `url(${product?.images[0]})` }}
          className={`${
            isSmall ? 'h-[150px] w-[150px]' : 'h-[200px] w-[200px]'
          } text-center bg-no-repeat bg-center bg-contain mt-2 mx-auto hover:scale-[1.1] transition-all`}
        ></div>
      </div>
      <div className="px-5 mt-3">
        <h3
          className={`${
            isSmall ? ' text-black text-base h-[48px] line-clamp-2' : 'text-lg h-[56px] line-clamp-2'
          } font-bold`}
        >
          {product?.name}
        </h3>
        <div className="flex gap-6 items-center mt-1">
          <p className=" text-base font-bold text-red-600">{`${product?.price.toFixed(2)} $`}</p>
          <p className="text-sm opacity-60 line-through">{`${(product?.price + 50).toFixed(2)} $`}</p>
        </div>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((el, idx) => {
            return (
              <FontAwesomeIcon
                key={idx}
                className={`${idx < product?.avgRatings ? 'text-[#08AC0A]' : 'text-[#4C4C4C]'} w-4`}
                icon={faStar}
              />
            );
          })}
          <p className="ml-3 text-sm">{`(${product?.numberRatings})`}</p>
        </div>

        <Button
          onClick={(e) => {
            handleAddProd(e);
          }}
          className={`mb-6 mt-3 hover:bg-primary-color hover:text-white ${
            isSmall ? 'px-[12px] py-[7px]' : 'px-[20px] py-[10px]'
          } text-base  min-w-[110px] rounded-full text-primary-color bg-white border border-primary-color transition-all`}
        >
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Add to cart'}
        </Button>
      </div>
      <div
        onClick={(e) => handleAddLikedProd(e)}
        className={`${
          isSmall ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'
        } absolute  transition-all  flex items-center ${
          userLikes?.includes(product._id) ? 'bg-pink-50 text-pink-600' : 'hover:bg-gray-200 bg-[#F5F6F6]'
        }   rounded-full top-[2%] right-[3%]`}
      >
        <FontAwesomeIcon
          icon={userLikes?.includes(product._id) ? faHeart2 : faHeart}
          className={`${isSmall ? 'text-lg' : 'text-xl'} mx-auto`}
        />
      </div>
      {showSuccessModal && (
        <div className="fixed m-auto z-[9999]  top-0 left-0 right-0 bottom-0 w-[300px] h-[240px]  bg-white rounded-2xl shadow-lg">
          <div className="w-[200px] h-[200px] mx-auto">
            <Lottie animationData={successAnimate} loop={false}></Lottie>
          </div>
          <p className=" text-center font-medium">Product added successfully !!!</p>
        </div>
      )}
    </Link>
  );
}

export default CartComponent;
