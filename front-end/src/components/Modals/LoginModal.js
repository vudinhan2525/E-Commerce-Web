import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { FacebookIcons, GoogleIcons, InstagramIcons, TwiterIcons } from '../../utils/IconSVG';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
function LoginModal() {
  const { setShowLoginModal } = useContext(AuthContext);
  const [method, setMethod] = useState('signin');
  const handleTurnOffModal = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowLoginModal(false);
    }
  };

  return (
    <div
      spellCheck={false}
      onMouseDown={(e) => handleTurnOffModal(e)}
      className=" modal fixed bg-black/50 top-0 bottom-0 left-0 right-0 z-[51]"
    >
      <div className="fixed px-8 py-8 rounded-2xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white w-[500px] ">
        {method === 'signin' && <SignIn setMethod={setMethod} />}
        {method === 'forgotPassword' && <ForgotPassword setMethod={setMethod} />}
        <p className="text-center mt-4">Or sign in with social platforms</p>
        <div className="flex justify-center mt-2 gap-4">
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <FacebookIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <GoogleIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <InstagramIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <TwiterIcons height="35px" width="35px" />
          </div>
        </div>
        <div className="bg-gray-200 h-[1px] w-full mt-5"></div>
        <div className="flex justify-center pt-3 gap-2">
          <div>You dont have an account?</div>
          <Link
            target="_blank"
            to="/register"
            onClick={() => setShowLoginModal(false)}
            className="text-[#EF2950] font-semibold underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
        <div
          onClick={() => setShowLoginModal(false)}
          className="bg-[#F5F6F6] hover:bg-gray-300 transition-all flex items-center justify-center w-[45px] h-[45px] absolute top-[25px] right-[30px] cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </div>
        {method === 'forgotPassword' && (
          <div
            onClick={() => setMethod('signin')}
            className="bg-[#F5F6F6] hover:bg-gray-300 transition-all flex items-center justify-center w-[45px] h-[45px] absolute rounded-full top-[25px] left-[30px] cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
