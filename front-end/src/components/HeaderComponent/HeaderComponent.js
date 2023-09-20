import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo';
import { UserIcon, CartIcon } from '../../utils/IconSVG/index';
import Search from './Search/Search';
function HeaderComponent() {
  return (
    <div className=" flex py-3 items-center shadow-sm fixed top-0 right-0 left-0 bg-white">
      <Link to="/" className="basis-1/4">
        <div className="w-52 mx-auto h-12 relative">
          {logo()}
          <p className="absolute top-[50%] translate-y-[-50%] right-[5%] font-bold text-xl text-primary-color">
            ShopCart
          </p>
        </div>
      </Link>
      <div className="basis-2/4 ">
        <Search />
      </div>
      <ul className="flex basis-1/4 gap-5">
        <li className="flex items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full bg-primary-color text-white hover:opacity-90">
          {UserIcon()}
          <p>Tài khoản</p>
        </li>
        <li className="flex items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full hover:bg-gray-100">
          {CartIcon()}
          <p>Giỏ Hàng</p>
        </li>
      </ul>
    </div>
  );
}

export default HeaderComponent;