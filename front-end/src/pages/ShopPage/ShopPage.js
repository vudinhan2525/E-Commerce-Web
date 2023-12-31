import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StarDefault, UserIcon, ProductIcon } from '../../utils/IconSVG';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import { useParams } from 'react-router-dom';
import http from '../../utils/http';
import SuggestProdShop from './SuggestProdShop';
import SortBar from '../../components/SortBar/SortBar';
import { Button } from '@material-tailwind/react';
import CartList from './CartList';
const initialSortObj = {
  newest: '0',
  price: '0',
};
function ShopPage() {
  const { userData, refreshUserData } = useContext(AuthContext);
  const param = useParams();
  const [shop, setShop] = useState({});
  const [productList, setProductList] = useState([]);
  const [filterObj, setFilterObj] = useState({});
  const [sortObj, setSortObj] = useState({});
  const [activeSort, setActiveSort] = useState(0);
  const getShop = async () => {
    try {
      const response = await http.get(`shop/${param.id}`);
      if (response.data.status === 'success') {
        setShop(response.data.data);
        setProductList(response.data.data.products);
        setFilterObj({
          priceMax: 1000,
          priceMin: 0,
          rating: 0,
        });
        setSortObj(initialSortObj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return (
    <div className="px-10">
      <div className="border-[1px] px-6 py-6 border-gray-500  w-full rounded-3xl mt-4">
        <div className="flex gap-12">
          <div className="flex gap-4">
            <div>
              <div
                style={{ backgroundImage: `url(${shop.avatar})` }}
                className="w-[120px] h-[120px] bg-no-repeat bg-center bg-contain rounded-full"
              ></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <header className="text-2xl font-semibold">{shop.name}</header>
                {shop.isChecked && <FontAwesomeIcon icon={faCircleCheck} className="text-lg text-[#20D5EC]" />}
              </div>
              <p className="mt-1">{shop.summary}</p>
              <p className="mt-2 text-sm text-gray-500">Last active: 6 minutes ago</p>

              <div className="flex gap-8">
                <div className="mt-2 text-white animate-slideTopDown flex items-center cursor-pointer px-4 gap-2 bg-primary-color border-[1.5px] border-primary-color  text-center rounded-full py-2 hover:opacity-90 transition-all">
                  {userData.shop?.includes(shop._id) && <FontAwesomeIcon icon={faCheck} />}
                  <p className="">{userData.shop?.includes(shop._id) ? 'Followed' : 'Follow'}</p>
                </div>
                <div className="mt-2 text-primary-color cursor-pointer bg-white border-[1.5px] border-primary-color w-[120px] text-center rounded-full py-2 hover:bg-primary-color hover:text-white transition-all">
                  Chat Now
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-x-20 gap-y-8 mt-4">
              <div className="flex items-center gap-1">
                <div>
                  <UserIcon width="24px" height="24px" />
                </div>
                <p className="text-base">{`Followers: ${shop.followers}k`}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="">
                  <StarDefault width="24px" height="24px" />
                </div>
                <p className="text-base">{`Number Rating: ${shop.numberRating?.toFixed(1)}`}</p>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <ProductIcon width="24px" height="24px" />
                </div>
                <p className="text-base">{`Number Product: ${shop.products?.length}`}</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="">
                  <StarDefault width="24px" height="24px" />
                </div>
                <p className="text-base">{`Average Rating: ${shop.averageRating?.toFixed(1)}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6">
        <SuggestProdShop shopProds={shop.products} userData={userData} refreshUserData={refreshUserData} />
        <div className=" mt-6">
          <div
            style={{ backgroundImage: `url(${shop.background})` }}
            className="w-full h-[400px] bg-no-repeat bg-center bg-cover"
          ></div>
        </div>
        <div className="mt-6 flex gap-6">
          <div className="basis-[20%] ">
            <div className="border-[1px] rounded-xl border-gray-300">
              <SortBar
                shopProds={shop.products}
                setProductList={setProductList}
                types={shop.categories}
                setFilterObj={setFilterObj}
              />
            </div>
          </div>
          <div className="basis-[80%]">
            <div className="w-[full] text-gray-700 py-3 flex gap-3 items-center px-6 rounded-xl border-[1px] bg-[#EDEDED] border-gray-300">
              <header>Sort by:</header>
              <Button
                onClick={() => {
                  setSortObj(initialSortObj);
                  setActiveSort(0);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 0 ? 'deep-orange' : 'white'}
              >
                Best Selling
              </Button>
              <Button
                onClick={() => {
                  setSortObj((prev) => {
                    return { price: '0', newest: '-1' };
                  });
                  setActiveSort(1);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 1 ? 'deep-orange' : 'white'}
              >
                Newest
              </Button>
              <Button
                onClick={() => {
                  setSortObj((prev) => {
                    return { newest: '0', price: '-1' };
                  });
                  setActiveSort(2);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 2 ? 'deep-orange' : 'white'}
              >
                Price: High-Low
              </Button>
              <Button
                onClick={() => {
                  setSortObj((prev) => {
                    return { newest: '0', price: '1' };
                  });
                  setActiveSort(3);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 3 ? 'deep-orange' : 'white'}
              >
                Price: Low-High
              </Button>
            </div>
            <CartList filter={filterObj} sortBy={sortObj} shopProducts={productList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
