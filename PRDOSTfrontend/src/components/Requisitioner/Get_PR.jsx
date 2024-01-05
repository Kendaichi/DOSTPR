import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import reject from "../../assets/delete.png";

const GetPr = () => {
  const [procurement, setProcurement] = useState([]);
  const auth = useAuthUser();
  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  // // handle approve
  // const handleApproveClick = async (e, itemId) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`${baseUrl}/pr/approve/${itemId}`);
  //     // Update only the specific item in the state
  //     setProcurement((prevProcurement) =>
  //       prevProcurement.map((item) =>
  //         item.id === itemId ? { ...item, is_approved: true } : item
  //       )
  //     );
  //     console.log(response);
  //     fetchPR();
  //   } catch (error) {
  //     console.error("Error approving PR:", error);
  //   }
  // };

  // handle reject ang delete
  const handleRejectClick = async (e, itemId) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${baseUrl}/pr/delete-pr/${itemId}`);
      fetchPRByOffice();
      console.log(response);
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  // Modifying the fetchPR function to fetch PRs by office
  const fetchPRByOffice = async () => {
    try {
      const response = await axios.post(`${baseUrl}/pr/get-pr-by-office`, {
        office: auth().office,
      });
      console.log(response);
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

  useEffect(() => {
    // fetchPR();
    fetchPRByOffice();
  }, []);

  return (
    <div className="w-full ">
      <div className="text-xl font-bold text-text_color drop-shadow-md mb-6">
        Purchase Requests
      </div>

      <Link to={"/pr-add"}>
        <div className="float-left mb-6 px-4 py-2 text-sm text-center font-semibold drop-shadow-sm bg-blue-300 shadow-lg rounded-lg hover:scale-110 duration-100">
          Add PR
        </div>
      </Link>

      <div className="flex justify-center float-right">
        <input
          className="p-2.5 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg h-9"
          placeholder="Search"
          type="text"
        />

        <div className="place-self-center mb-6 px-4 py-2 text-sm text-center font-semibold drop-shadow-sm bg-blue-300 shadow-lg rounded-lg hover:scale-110 duration-100">
          Search
        </div>
      </div>

      {/* <div className="float-right px-4 py-2 mb-3 text-sm text-center font-semibold drop-shadow-sm bg-blue-300 shadow-lg rounded-lg hover:scale-110 duration-100">
        Add AOC
      </div> */}

      <div className="mt-6 w-full shadow-xl bg-table_color rounded-md border border-white">
        <div className="h-full m-5">
          <table className="w-full text-md text-left rounded-full">
            <thead className="text-sm bg-blue-300 font-semibold">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Office Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Draft Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {procurement.map((item) => (
                <tr className="bg-white border-b" key={item.temp_id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Link to={`/pr-details/${item.temp_id}`}>
                      <div className="font-semibold hover:underline hover:text-blue-500 duration-100">
                        {item.office}
                      </div>
                    </Link>
                  </th>

                  <td className="px-6 py-4">{formatDate(item.created_At)}</td>
                  <td
                    className={`px-6 py-4 
                    ${item.is_submitted ? "text-green-500" : "text-red-500"}
                    `}
                  >
                    {item.is_submitted ? "submitted" : "pending"}
                  </td>
                  <td className="flex justify-start mt-4 gap-2">
                    {/* <div className="place-self-center">
                      <button onClick={(e) => handleApproveClick(e, item.id)}>
                        {" "}
                        <img
                          src={view}
                          alt="approve_request"
                          height={30}
                          width={30}
                          className="hover:scale-150 duration-100"
                        />
                      </button>
                    </div> */}

                    {/* <div className="place-self-center">
                      <button>
                        <img
                          src={download}
                          alt="download"
                          height={25}
                          width={25}
                          className="hover:scale-150 duration-100"
                        />
                      </button>
                    </div> */}

                    <div className="place-self-center">
                      <button
                        onClick={(e) => handleRejectClick(e, item.temp_id)}
                      >
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

export default GetPr;
