import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useAuthUser } from "react-auth-kit";

import SideBar from "../components/Sidebar";
import Nav from "../components/Nav";
import GetPr from "../components/Requisitioner/Get_PR";
import AddPr from "../components/Requisitioner/Add_PR";
import EditPRSig from "../components/Requisitioner/Edit_PRSig";
import EditPRIte from "../components/Requisitioner/Edit_PRIte";
import PRDetails from "../components/Requisitioner/Pr_Details";
import SubmittedPR from "../components/Supplier/PR/Submitted";
import SubmittedDetails from "../components/Supplier/PR/Submitted_details";
import Aoc from "../components/Supplier/AOC/AOC";
import Aoc_Details from "../components/Supplier/AOC/AOC_details";
import Aoc_Edit from "../components/Supplier/AOC/AOC_edit";
import PO from "../components/Supplier/PO/PO";
import PODetails from "../components/Supplier/PO/PO_details";

const Home = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const auth = useAuthUser();

  useEffect(() => {
    try {
      if (!isAuthenticated()) {
        navigate("/log-in");
      }
    } catch (error) {
      console.log(`Error occurred: ${error}`);
    }
  }, []);

  // Define the default homepage content
  const defaultHomeContent = (
    <div className="p-5 flex flex-col justify-start gap-5">
      <div className="text-xl font-bold tracking-wide text-text_color">
        Procurement Management System{" "}
      </div>
      <div className="font-semibold">
        Welcome to the Procurement Management System,{" "}
        <span className="text-text_color">
          {" "}
          {auth() && auth().office ? auth().office : "Unknown Office"}
        </span>
        !
      </div>
    </div>
  );

  // Define the available routes for each role
  const roleRoutes = {
    admin: [
      <Route key="get-pr" path="/get-pr" exact element={<GetPr />} />,
      <Route key="pr-add" path="/pr-add" element={<AddPr />} />,
      <Route key="pr-editSig" path="/pr-editSig/:id" element={<EditPRSig />} />,
      <Route key="pr-editIte" path="/pr-editIte/:id" element={<EditPRIte />} />,
      <Route key="pr-details" path="/pr-details/:id" element={<PRDetails />} />,
      <Route
        key="submitted-pr"
        path="/submitted-pr"
        exact
        element={<SubmittedPR />}
      />,
      <Route
        key="submitted-details"
        path="/submitted-details/:id"
        element={<SubmittedDetails />}
      />,
      <Route key="sub-aoc" path="/sub-aoc" exact element={<Aoc />} />,
      <Route
        key="details-aoc"
        path="/details-aoc/:id"
        exact
        element={<Aoc_Details />}
      />,
      <Route
        key="edit-aoc"
        path="/edit-aoc/:id"
        exact
        element={<Aoc_Edit />}
      />,
      <Route key="po" path="/po" element={<PO />} />,
      <Route key="po-details" path="/po-details/:id" element={<PODetails />} />,
      <Route key="home" path="/" element={defaultHomeContent} />,
    ],
    requisitioner: [
      <Route key="get-pr" path="/get-pr" exact element={<GetPr />} />,
      <Route key="pr-add" path="/pr-add" element={<AddPr />} />,
      <Route key="pr-editSig" path="/pr-editSig/:id" element={<EditPRSig />} />,
      <Route key="pr-editIte" path="/pr-editIte/:id" element={<EditPRIte />} />,
      <Route key="pr-details" path="/pr-details/:id" element={<PRDetails />} />,
      <Route key="home" path="/" element={defaultHomeContent} />,
    ],
    supply: [
      <Route key="sub-aoc" path="/sub-aoc" exact element={<Aoc />} />,
      <Route
        key="submitted-pr"
        path="/submitted-pr"
        exact
        element={<SubmittedPR />}
      />,
      <Route
        key="submitted-details"
        path="/submitted-details/:id"
        element={<SubmittedDetails />}
      />,
      <Route key="sub-aoc" path="/sub-aoc" exact element={<Aoc />} />,
      <Route
        key="details-aoc"
        path="/details-aoc/:id"
        exact
        element={<Aoc_Details />}
      />,
      <Route
        key="edit-aoc"
        path="/edit-aoc/:id"
        exact
        element={<Aoc_Edit />}
      />,
      <Route key="po" path="/po" element={<PO />} />,
      <Route key="po-details" path="/po-details/:id" element={<PODetails />} />,
      <Route key="home" path="/" element={defaultHomeContent} />,
    ],
  };

  const routesForUserRole =
    roleRoutes[auth() && auth().role ? auth().role : "Unknown Role"] || [];

  return (
    <div className="h-[100vh]">
      <div className="flex">
        <SideBar />
        <div className="w-[20%]"></div>
        <div className="w-[80%]">
          <Nav />
          <div className="px-16 w-auto">
            <Routes>{routesForUserRole}</Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
