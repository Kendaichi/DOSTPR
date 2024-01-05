import logo from "../assets/DOST.png";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  const roleLinks = {
    admin: [
      {
        label: "Manage Pending Procurement",
        path: "/get-pr",
      },
      {
        label: "Manage Submitted PRs",
        path: "/submitted-pr",
      },
      {
        label: "Manage AOC",
        path: "/sub-aoc",
      },
      {
        label: "Manage PO",
        path: "/po",
      },
    ],
    requisitioner: [
      {
        label: "Manage Pending Procurement",
        path: "/get-pr",
      },
    ],
    supply: [
      {
        label: "Manage Submitted PRs",
        path: "/submitted-pr",
      },
      {
        label: "Manage AOC",
        path: "/sub-aoc",
      },
      {
        label: "Manage PO",
        path: "/po",
      },
    ],
  };

  return (
    <div
      className="text-gray-700 sticky w-[20%] h-[100vh] shadow bg-white z-50"
      style={{ position: "fixed", left: 0 }}
    >
      <div className=" h-[30%] flex flex-col justify-center ">
        <a href="/" className="place-self-center drop-shadow-xl ">
          <img src={logo} alt="dost_logo" height={120} width={120} />
        </a>
        <div className="mt-2 text-center font-semibold ">
          {auth() && auth().office ? auth().office : "Unknown Office"}
          <div className="mt-2 text-center italic">
            {auth() && auth().email ? auth().email : "Unknown Email"}
          </div>
          {/* {auth() && auth().role ? auth().role : "Unknown Role"} */}
        </div>
      </div>

      <div className=" h-[70%] flex flex-col gap-10 justify-start p-4 ">
        <div className="font-bold mt-5 ">Procurement</div>

        {roleLinks[auth() && auth().role ? auth().role : "Unknown Role"] &&
          roleLinks[auth() && auth().role ? auth().role : "Unknown Role"].map(
            (link, index) => (
              <button key={index} onClick={() => navigate(link.path)}>
                <div className="flex">
                  {/* Use link.label for button text */}
                  <div className="place-self-center ml-3 font-semibold">
                    {link.label}
                  </div>
                </div>
              </button>
            )
          )}

        <div className="font-bold text-sm text-center h-full flex flex-col justify-end">
          <div>@ 2023 Procurement Management System</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
