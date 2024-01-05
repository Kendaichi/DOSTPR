import { useSignOut, useAuthUser } from "react-auth-kit";
import notification from "../assets/notification.png";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleLogout = async () => {
    signOut();
    navigate("/log-in");
  };

  return (
    <div className="h-16 w-full">
      <div className="flex flex-row justify-end text-center text-base my-4">
        <div className="flex"></div>
        <div className="place-self-center flex gap-16 pr-5">
          <div className="place-self-center">
            {/* <img src={notification} alt="bell_icon" height={25} width={25} /> */}
          </div>
          <div className="place-self-center text-base">
            <button onClick={() => {}}>
              <div className="text-center  place-self-center">Account</div>
            </button>
          </div>
          <div className="place-self-center text-base">
            <button onClick={handleLogout}>
              <div className="text-center  place-self-center mr-5">Logout</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="sticky w-full flex flex-row shadow-md">
    //   <div className="h-16 w-full flex flex-row justify-between text-center text-3xl bg-logo ml-4 mr-4">
    //     <div className="flex">
    //       <div className="place-self-center drop-shadow-xl pl-5 ">
    //         <img src={logo} alt="dost_logo" height={60} width={60} />
    //       </div>
    //       <div className="place-self-center text-2xl  text-left pl-2 font-bold ">
    //         DOST CARAGA
    //       </div>
    //     </div>

    //     <div className="place-self-center flex gap-16 pr-5">
    //       <div className="place-self-center">
    //         <img src={notification} alt="bell_icon" height={25} width={25} />
    //       </div>
    //       <div className="place-self-center text-base">
    //         <button onClick={() => {}}>
    //           <div className="text-center  place-self-center">Account</div>
    //         </button>
    //       </div>
    //       <div className="place-self-center text-base">
    //         <button onClick={handleLogout}>
    //           <div className="text-center  place-self-center">Logout</div>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Nav;
