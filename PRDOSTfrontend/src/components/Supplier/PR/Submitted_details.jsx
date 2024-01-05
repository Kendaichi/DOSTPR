import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RFQFile from "../../pdf_templates/RFQFile";

const SubmittedDetails = () => {
  const [details, setDetails] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/submitted/get-submitted-pr/${id}`
      );
      await setDetails(response.data);
      // console.log(response.data);
      const json_items = await JSON.parse(response.data.pr.json_items);
      // const parsedJsonItems = await JSON.parse(json_items);
      //   console.log(parsedJsonItems);
      setItems(json_items);
      // console.log(json_items);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  const handlePrintRFQButton = async () => {
    try {
      await axios.put(`${baseUrl}/toggle-isRFQ/${id}`);
    } catch (error) {
      console.error("Error printing RFQ document:", error);
    }
  };

  const handleCreateAOC = async (pr_id) => {
    try {
      const requestData = {
        pr_id: pr_id,
      };
      const response = await axios.post(
        `${baseUrl}/submitted/add-aoc`,
        requestData
      );

      if (response.status === 200) {
        console.log("AOC Added Successfully:", response.data.message);
        alert("AOC Added Successfully");
        navigate("/sub-aoc");
      } else {
        alert("An error occured");
      }
    } catch (error) {
      console.error("Error adding AOC:", error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const prfileProps = {
    details: details,
    items: items,
  };

  return (
    <div className="w-full flex flex-col">
      <Link to={"/submitted-pr"} className="text-base w-24 text-center ">
        <div className="bg-blue-300 rounded-full p-3 w-full mb-5 hover:scale-110 duration-100">
          Back
        </div>
      </Link>

      <div className="flex justify-between">
        <div className="text-xl font-bold text-text_color place-self-center">
          Submitted Purchase Request Details
        </div>

        <div>
          {prfileProps && (
            <PDFDownloadLink
              document={<RFQFile {...prfileProps} />}
              fileName="RFQ.pdf"
              className="place-self-end mt-5"
              onClick={handlePrintRFQButton}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <button disabled>
                    <div className="text-base  text-center drop-shadow-2xl w-48 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100">
                      Loading...
                    </div>
                  </button>
                ) : (
                  <button>
                    <div className="text-base text-center drop-shadow-2xl w-48 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100">
                      Print RFQ Document
                    </div>
                  </button>
                )
              }
            </PDFDownloadLink>
          )}

          {details && (
            <button
              className="ml-2"
              onClick={() => handleCreateAOC(details.pr.pr_id)}
            >
              <div className="text-base text-center drop-shadow-2xl w-48 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100">
                Create AOC
              </div>
            </button>
          )}
        </div>
      </div>
      {error ? (
        <div className="w-full text-xl font-semibold text-center place-self-center ">
          An error Occured
        </div>
      ) : (
        <div className="mt-6 w-full shadow-2xl bg-table_color rounded-lg">
          {details && (
            <div className="h-full m-5 ">
              {/* Check if details is available before rendering */}

              <div className=" w-full text-base font-semibold mb-5">
                Office Name:{" "}
                <span className="text-text_color mr-5">
                  {details.pr.office}
                </span>
                <br />
                Purpose:{" "}
                <span className="text-text_color">{details.pr.purpose}</span>
                <br />
                Source of Fund:{" "}
                <span className="text-text_color">
                  {details.pr.source_of_fund}
                </span>
              </div>
              <div className="w-full font-semibold flex justify-between">
                <div className="h-[100px]  w-[300px] text-center">
                  Requested by:
                  <br />
                  <span className="text-base text-text_color">
                    {details.pr.Requested_by}
                  </span>
                  <br />
                  {details.pr.Desig_Req}
                </div>
                <div className="h-[100px]  w-[300px] text-center">
                  Recommending Approval:
                  <br />
                  <span className="text-base text-text_color">
                    {details.pr.Recommending}
                  </span>
                  <br />
                  {details.pr.Desig_Reco}
                </div>
                <div className="h-[100px]  w-[300px] text-center">
                  Approved by:
                  <br />
                  <span className="text-base text-text_color">
                    {details.pr.Approved_By}
                  </span>
                  <br />
                  {details.pr.Desig_Appr}
                </div>
              </div>

              <table className="w-full text-left rounded-full">
                <thead className="text-base bg-blue-300 font-semibold">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Unit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Item Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Unit Cost
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr className="bg-white border-b" key={index}>
                      <td className="px-6 py-4">{item.unit}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.item_name}{" "}
                        {JSON.parse(item.item_description).map(
                          (desc, index) => (
                            <div key={index}>
                              <span className="font-normal">{desc}</span>
                            </div>
                          )
                        )}
                      </th>
                      <td className="px-6 py-4">{item.item_quantity}</td>
                      <td className="px-6 py-4">PHP {item.unit_cost}</td>
                      <td className="px-6 py-4">PHP {item.total}</td>
                    </tr>
                  ))}

                  <tr className="bg-white border-b">
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 font-bold">Total</td>
                    <td className="px-6 py-4 font-bold">
                      PHP {items.reduce((sum, item) => sum + item.total, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmittedDetails;
