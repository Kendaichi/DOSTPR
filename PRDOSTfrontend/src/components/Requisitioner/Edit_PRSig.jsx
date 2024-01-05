import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPRSig = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();

  const { id } = useParams();
  const [formData, setFormData] = useState({
    office: "",
    purpose: "",
    source_of_fund: "",
    Requested_by: "",
    Desig_Req: "",
    Recommending: "",
    Desig_Reco: "",
    Approved_By: "",
    Desig_Appr: "",
  });

  const [rows, setRows] = useState([]);

  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchPrData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pr/get-pr/${id}`);
      const prData = response.data.pr;

      // Extract and set form data
      setFormData({
        office: auth().office,
        purpose: prData.purpose,
        source_of_fund: prData.source_of_fund,
        Requested_by: prData.Requested_by,
        Desig_Req: prData.Desig_Req,
        Recommending: prData.Recommending,
        Desig_Reco: prData.Desig_Reco,
        Approved_By: prData.Approved_By,
        Desig_Appr: prData.Desig_Appr,
      });

      console.log(formData);

      // Extract and set rows data
      const items = JSON.parse(prData.json_items);
      setRows(items);
      console.log(items);
    } catch (error) {
      console.error("Error fetching PR data:", error);
    }
  };

  useEffect(() => {
    fetchPrData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      purpose: formData.purpose,
      source_of_fund: formData.source_of_fund,
      Requested_by: formData.Requested_by,
      Desig_Req: formData.Desig_Req,
      Recommending: formData.Recommending,
      Desig_Reco: formData.Desig_Reco,
      Approved_By: formData.Approved_By,
      Desig_Appr: formData.Desig_Appr,
    };

    try {
      const response = await axios.put(
        `${baseUrl}/pr/edit-prSig/${id}`,
        requestData
      );

      if (response.status === 200) {
        console.log(
          "Procurement Request Updated Successfully: ",
          response.data.message
        );
        alert("Procurement Requests Updated Successfully");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating PR:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleGoBack} className="text-base w-24 text-center ">
        <div className="bg-blue-300 rounded-full p-3 w-28 mb-5 hover:scale-110 duration-100">
          Back
        </div>
      </button>

      <div className="text-xl font-bold text-text_color drop-shadow-md">
        EDIT PROCUREMENT REQUEST - Signatories
      </div>

      <div className="p-5 shadow-lg rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex">
            <div className="w-full mb-5">
              <label htmlFor="source_of_fund" className="font-semibold">
                Source of Fund:
              </label>
              <input
                className="w-[60%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="e.g Local GIA - STORRM"
                required
                type="text"
                id="source_of_fund"
                name="source_of_fund"
                value={formData.source_of_fund}
                onChange={(e) => {
                  setFormData({ ...formData, source_of_fund: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-full mb-5">
              <label htmlFor="purpose" className="font-semibold">
                Purpose:
              </label>
              <input
                className="w-[87%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Purpose of the PR"
                required
                type="text"
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={(e) => {
                  setFormData({ ...formData, purpose: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="w-full flex  mb-5">
            <div className="w-full">
              <label htmlFor="Requested_by" className="font-semibold">
                Requested By:
              </label>
              <input
                className="w-[30%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Name of Requestor"
                required
                type="text"
                id="Requested_by"
                name="Requested_by"
                value={formData.Requested_by}
                onChange={(e) => {
                  setFormData({ ...formData, Requested_by: e.target.value });
                }}
              />

              <label htmlFor="Desig_Req" className="font-semibold ml-5">
                Designation:
              </label>
              <input
                className="w-[40%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Designation of the Requisitioner "
                required
                type="text"
                id="Desig_Req"
                name="Desig_Req"
                value={formData.Desig_Req}
                onChange={(e) => {
                  setFormData({ ...formData, Desig_Req: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="w-full flex mb-5">
            <div className="w-full">
              <label htmlFor="Recommending" className="font-semibold">
                Recommending:
              </label>
              <input
                className="w-[30%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Name of Recommending Approval"
                required
                type="text"
                id="Recommending"
                name="Recommending"
                value={formData.Recommending}
                onChange={(e) => {
                  setFormData({ ...formData, Recommending: e.target.value });
                }}
              />

              <label htmlFor="Desig_Reco" className="font-semibold ml-5">
                Designation:
              </label>
              <input
                className="w-[40%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Designation of the Recommending Approval"
                required
                type="text"
                id="Desig_Reco"
                name="Desig_Reco"
                value={formData.Desig_Reco}
                onChange={(e) => {
                  setFormData({ ...formData, Desig_Reco: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="w-fullflex mb-5">
            <div className="w-full">
              <label htmlFor="Approved_By" className="font-semibold">
                Approved By:
              </label>
              <input
                className="w-[30%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Name of Approval"
                required
                type="text"
                id="Approved_By"
                name="Approved_By"
                value={formData.Approved_By}
                onChange={(e) => {
                  setFormData({ ...formData, Approved_By: e.target.value });
                }}
              />

              <label htmlFor="Desig_Appr" className="font-semibold ml-5">
                Designation:
              </label>
              <input
                className="w-[40%] p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                placeholder="Designation of the Approved by"
                required
                type="text"
                id="Desig_Appr"
                name="Desig_Appr"
                value={formData.Desig_Appr}
                onChange={(e) => {
                  setFormData({ ...formData, Desig_Appr: e.target.value });
                }}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            className="place-self-end text-lg text-center w-52 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100"
          />
        </form>
      </div>
    </div>
  );
};

export default EditPRSig;
