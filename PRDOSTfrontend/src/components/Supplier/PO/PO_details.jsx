import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import download from "../../../assets/cloud-download.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import POfile from "../../pdf_templates/POFile";

const PODetails = () => {
  const [po, setPo] = useState({
    place_of_delivery: "",
    date_of_delivery: "",
    delivery_term: "",
    payment_term: "",
    mode_of_procurement: "",
  });
  const [pr, setPr] = useState(null);
  const [items, setItems] = useState([]);
  const [winners, setWinners] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittingGroup, setSubmittingGroup] = useState([]);
  const [selectWinner, setSelectedWinner] = useState(null);

  const { id } = useParams();

  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const handleSetEditing = () => setIsEditing(!isEditing);
  const handleSubmitting = () => setSubmitting(!submitting);

  const fetchPo = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/submitted/get-poDetails/${id}`
      );

      setPo(response.data.po);
      setPr(response.data.pr);

      setItems(JSON.parse(response.data.pr.json_items));
      setWinners(JSON.parse(response.data.po.aoc.winners));
      setSuppliers(JSON.parse(response.data.po.aoc.suppliers));
      //   console.log(suppliers);

      // console.log(po);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const createFinalList = () => {
    const tempFinalList = items.map((item, index) => {
      const winnerName = winners[index];
      const winner = suppliers.find((sup) => sup.sup_name === winnerName);
      const priceIndex = winners.indexOf(winnerName);
      const prices = winner ? JSON.parse(winner.prices) : null;

      return {
        item_description: item.item_description,
        item_name: item.item_name,
        item_quantity: item.item_quantity,
        unit: item.unit,
        winner: winnerName,
        winner_Address: winner ? winner.sup_add : null,
        price: prices && prices[priceIndex],
      };
    });

    setFinalList(tempFinalList);
  };

  const groupByWinner = async (finalList) => {
    const winnerMap = {};

    finalList.forEach((item) => {
      const { winner, winner_Address, ...rest } = item;

      if (!winnerMap[winner]) {
        winnerMap[winner] = { winner, address: winner_Address, items: [] };
      }

      winnerMap[winner].items.push({ ...rest });
    });

    setSubmittingGroup(Object.values(winnerMap));
    // console.log(winnerMap);
    // return Object.values(winnerMap);
    // console.log(submittingGroup);
  };

  const handleChange = (fieldName, value) => {
    setPo((prevPo) => ({
      ...prevPo,
      [fieldName]: value,
    }));
    // console.log(po);
  };

  const handleSaveChanges = async () => {
    // Create an object with only the fields that need to be updated
    const updatedFields = {
      mode_of_procurement: po.mode_of_procurement,
      place_of_delivery: po.place_of_delivery,
      date_of_delivery: po.date_of_delivery,
      delivery_term: po.delivery_term,
      payment_term: po.payment_term,
    };

    // console.log("run");

    // // Make a PUT request to save the changes on the backend
    try {
      const response = await axios.put(
        `${baseUrl}/submitted/edit-po/${po.po_id}`,
        updatedFields
      );
      //   console.log(response);
      // After successfully saving changes, turn off editing mode
      handleSetEditing();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    fetchPo();
  }, []);

  useEffect(() => {
    createFinalList();
  }, [items, winners, suppliers]);

  useEffect(() => {
    groupByWinner(finalList);
  }, [finalList]);

  const poDetails = {
    place_of_delivery: po.place_of_delivery,
    date_of_delivery: po.date_of_delivery,
    delivery_term: po.delivery_term,
    mode_of_procurement: po.mode_of_procurement,
    payment_term: po.payment_term,
  };

  return (
    <div className="w-full flex flex-col">
      {/* modal */}
      {submitting ? (
        <div className="absolute w-full h-full bg-black bg-opacity-25 top-0 left-0 z-50 flex justify-center">
          <div className="relative border bg-white w-1/3 h-1/3 place-self-center rounded-lg shadow flex flex-col px-6 py-10">
            <div className="absolute right-3 top-2">
              <div className="p-3 place-self-end bg-hint bg-center bg-contain bg-no-repeat tooltip">
                <div className="tooltiptext w-auto py-2 bg-slate-100 -right-28 top-5 px-3 text-xs">
                  {submittingGroup.map((batch, index) => (
                    <optgroup
                      label={`Supplier ${index + 1}`}
                      key={`Batch ${index}`}
                      value={`Supplier ${index + 1}`}
                      className="text-black text-left"
                      disabled
                    >
                      <option>{batch.winner}</option>
                    </optgroup>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-lg">Choose Supplier:</div>
            <br />
            <br />
            <select
              name="batch"
              id="batch"
              className="border rounded h-10 w-1/2 place-self-center"
              onChange={async (e) => {
                // console.log(e.target.value);
                await setSelectedWinner(e.target.value);
                console.log(submittingGroup);
              }}
            >
              <option value="">Select a batch</option>
              {submittingGroup.map((batch, index) => (
                <option value={index} key={`Batch ${index}`}>
                  {batch.winner}
                </option>
              ))}
            </select>
            <br />
            <br />
            <div className="place-self-end flex gap-2">
              <button
                className="border w-24 h-10 rounded bg-gray-500 text-white"
                onClick={handleSubmitting}
              >
                Cancel
              </button>

              {submittingGroup &&
                Object.keys(submittingGroup).length > 0 &&
                (selectWinner != null && selectWinner != "" ? (
                  <PDFDownloadLink
                    document={
                      <POfile
                        {...submittingGroup[selectWinner]}
                        PODetails={poDetails}
                      />
                    }
                    fileName="PO.pdf"
                    className="place-self-center flex"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        <button
                          className="border w-24 h-10 rounded bg-green-600 text-white"
                          disabled
                        >
                          Loading
                        </button>
                      ) : (
                        <button className="border w-24 h-10 rounded bg-green-600 text-white">
                          Submit
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                ) : (
                  <button
                    className="border w-24 h-10 rounded bg-green-600 text-white hover:cursor-not-allowed"
                    disabled
                  >
                    Select
                  </button>
                ))}
            </div>
          </div>
        </div>
      ) : null}
      {/* modal end */}
      <Link to={"/po"} className="text-base w-24 text-center ">
        <div className="bg-blue-300 rounded-full p-3 w-full mb-5 hover:scale-110 duration-100">
          Back
        </div>
      </Link>

      <div className="flex justify-between">
        <div className="text-xl font-bold text-text_color place-self-center">
          Purchase Order Details
        </div>

        {isEditing ? (
          <div className=" flex gap-4">
            <button
              onClick={handleSetEditing}
              className="px-4 bg-gray-500 text-white rounded place-self-center"
            >
              Edit
            </button>

            <button className="place-self-center">
              <img
                src={download}
                alt="download"
                height={30}
                width={30}
                className="hover:scale-150 duration-100"
                onClick={handleSubmitting}
              />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSetEditing}
              className="border px-4 bg-red-500 text-white rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveChanges}
              className="border px-4 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 w-full shadow-2xl bg-table_color rounded-lg">
        <div className="h-full m-5 ">
          {/* Check if details is available before rendering */}
          {po && (
            <div className=" w-full text-base font-semibold mb-5">
              Place of Delivery:{" "}
              <span className="text-text_color mr-5">
                {/* {po.place_of_delivery || ""} */}
                <input
                  type="text"
                  className="rounded text-lg w-96 disabled:bg-white"
                  value={po.place_of_delivery || ""}
                  onChange={(e) =>
                    handleChange("place_of_delivery", e.target.value)
                  }
                  disabled={isEditing}
                />
              </span>
              <br />
              Date of Delivery:{" "}
              <span className="text-text_color">
                <input
                  type="text"
                  className="rounded text-lg w-96 disabled:bg-white"
                  value={po.date_of_delivery || ""}
                  onChange={(e) =>
                    handleChange("date_of_delivery", e.target.value)
                  }
                  disabled={isEditing}
                />
              </span>
              <br />
              Delivery Term:{" "}
              <span className="text-text_color">
                <input
                  type="text"
                  className="rounded text-lg w-96 disabled:bg-white"
                  value={po.delivery_term || ""}
                  onChange={(e) =>
                    handleChange("delivery_term", e.target.value)
                  }
                  disabled={isEditing}
                />
              </span>
              <br />
              Payment Term:{" "}
              <span className="text-text_color">
                <input
                  type="text"
                  className="rounded text-lg w-96 disabled:bg-white"
                  value={po.payment_term || ""}
                  onChange={(e) => handleChange("payment_term", e.target.value)}
                  disabled={isEditing}
                />
              </span>
              <br />
              Mode of Procurement:{" "}
              <span className="text-text_color">
                <input
                  type="text"
                  className="rounded text-lg w-96 disabled:bg-white"
                  value={po.mode_of_procurement || ""}
                  onChange={(e) =>
                    handleChange("mode_of_procurement", e.target.value)
                  }
                  disabled={isEditing}
                />
              </span>
            </div>
          )}
          {/* <div className="w-full font-semibold flex justify-between">
            <div className="h-[100px]  w-[300px] text-center">
              Requested by:
              <br />
              <span className="text-base text-text_color"></span>
              <br />
            </div>
            <div className="h-[100px]  w-[300px] text-center">
              Recommending Approval:
              <br />
              <span className="text-base text-text_color"></span>
              <br />
            </div>
            <div className="h-[100px]  w-[300px] text-center">
              Approved by:
              <br />
              <span className="text-base text-text_color"></span>
              <br />
            </div>
          </div> */}

          <table className="w-full text-left rounded-full">
            <thead className="text-base bg-blue-300 font-semibold">
              <tr>
                <th scope="col" className="px-6 py-6 w-28  h-[130px]">
                  Stock/Property No.
                </th>
                <th scope="col" className="px-6 py-6 w-28  h-[130px]">
                  Unit
                </th>
                <th scope="col" className="px-6 py-6 w-40  h-[130px]">
                  Description
                </th>
                <th scope="col" className="px-6 py-6 w-28  h-[130px]">
                  QTY
                </th>
                <th scope="col" className="px-6 py-6 w-36  h-[130px]">
                  Winner & Unit Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {finalList &&
                finalList.map((item, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4">{item.unit}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.item_name}{" "}
                      {JSON.parse(item.item_description).map((desc, index) => (
                        <div key={index}>
                          <span className="font-normal">{desc}</span>
                        </div>
                      ))}
                    </th>
                    <td className="px-6 py-4">{item.item_quantity}</td>
                    <td className="px-6 py-4">
                      {item.winner}
                      <br />
                      PHP {item.price}
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

export default PODetails;
