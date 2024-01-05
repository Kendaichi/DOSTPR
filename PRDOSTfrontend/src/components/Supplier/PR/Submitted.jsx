import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import reject from "../../../assets/delete.png";

const SubmittedPR = () => {
  const [procurement, setProcurement] = useState([]);
  // const auth = useAuthUser();
  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  //fetching PRs
  const fetchPR = async () => {
    try {
      const response = await axios.get(`${baseUrl}/submitted/get-submitted-pr`);
      // console.log(response);
      const parsedProcurement = response.data.pr.map((item) => ({
        ...item,
        json_items: tryParseJSON(item.json_items), // Parse json_items field
      }));
      //   console.log(parsedProcurement);
      await setProcurement(parsedProcurement);
      console.log(procurement);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Helper function to safely parse JSON
  const tryParseJSON = (jsonString) => {
    try {
      const parsedStringify = JSON.parse(jsonString);
      //   console.log(parsed);
      // const parsedJson = JSON.parse(parsedStringify);
      //   console.log(parsedJson);
      return Array.isArray(parsedStringify) ? parsedStringify : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  // Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStatusChange = async (value, pr_id) => {
    try {
      // First, update the status in the backend using your PUT request
      await axios.put(`${baseUrl}/submitted/status/${pr_id}`, {
        status: value,
      });

      // After successfully updating the status, fetch the updated procurement data
      await fetchPR();

      console.log(`Status updated to ${value} for PR ID ${pr_id}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRejectClick = async (e, itemId) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${baseUrl}/submitted/delete-pr/${itemId}`
      );
      fetchPR();
      console.log(response);
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  useEffect(() => {
    fetchPR();
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-bold text-text_color drop-shadow-md">
        Submitted Purchase Requests
      </div>
      <div className="mt-6 w-full shadow-2xl bg-table_color rounded-md">
        <div className="h-full m-5">
          <table className="w-full text-md text-left rounded-full">
            <thead className="text-sm bg-blue-300 font-semibold">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Office Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Submit Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {procurement.map((item) => (
                <tr className="bg-white border-b" key={item.pr_id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Link to={`/submitted-details/${item.pr_id}`}>
                      <div className="font-semibold hover:underline hover:text-blue-500 duration-100">
                        {item.office}
                      </div>
                    </Link>
                  </th>

                  <td className="px-6 py-4">{formatDate(item.submitted_at)}</td>

                  <td className={"pl-5 py-4"}>
                    <select
                      onChange={(event) =>
                        handleStatusChange(event.target.value, item.pr_id)
                      }
                    >
                      <option value="default">{item.status}</option>

                      <option value="RFQ on-going">RFQ on-going</option>

                      <option value="AOC on-going">AOC on-going</option>

                      <option value="PO on-going">PO on-going</option>

                      <option value="PR Succesfull">PR Succesfull</option>
                    </select>
                  </td>

                  <td className="flex justify-start place-content-center pt-4">
                    <div className="place-self-center">
                      <button onClick={(e) => handleRejectClick(e, item.pr_id)}>
                        <img
                          src={reject}
                          alt="reject_request"
                          height={22}
                          width={22}
                          className="hover:scale-150 duration-100"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmittedPR;
