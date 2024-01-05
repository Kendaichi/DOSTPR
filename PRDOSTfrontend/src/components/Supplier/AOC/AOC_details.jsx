import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import plus from "../../../assets/plus.png";
import download from "../../../assets/cloud-download.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AOCfile from "../../pdf_templates/AOCfile";

const Aoc_Details = () => {
  const [aoc, setAoc] = useState([]);
  const [pr, setPR] = useState([]);
  const [items, setItems] = useState([]);
  const [divs, setDivs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([
    { name: "", address: "", numbers: [] },
  ]);
  const [fetchedSuppliers, setFetchedSuppliers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [groupedSuppliers, setGroupedSuppliers] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();
  // const [selectedWinners, setSelectedWinners] = useState([]);

  // const auth = useAuthUser();
  const { id } = useParams();

  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const handleSelectChange = async (event, index) => {
    const selectedValue = event.target.value;
    const updatedWinners = [...winners];
    updatedWinners[index] = selectedValue;
    const parsedWinners = JSON.stringify(updatedWinners);
    const response = await axios.put(
      `${baseUrl}/submitted/edit-AocWinners/${id}`,
      {
        winners: parsedWinners,
      }
    );
    console.log(response.data.message);
    setWinners(updatedWinners);
  };

  const handleCreatePo = async (aoc_id) => {
    try {
      const requestData = {
        aoc_id: aoc_id,
      };
      const response = await axios.post(
        `${baseUrl}/submitted/add-po`,
        requestData
      );

      if (response.status === 200) {
        console.log("PO Added Successfully:", response.data.message);
        alert("PO Added Successfully");
        navigate("/po");
      } else {
        alert("An error occured");
      }
    } catch (error) {
      console.error("Error adding PO:", error.message);
    }
  };

  const handleSetEditing = () => setEditing(!editing);

  const handleSetSubmitting = () => setIsSubmitting(!submitting);

  const handleFormChange = (
    supplierIndex,
    inputName,
    event,
    divIndex,
    itemIndex
  ) => {
    const { value } = event.target;

    setSuppliers((prevSuppliers) => {
      const newSuppliers = [...prevSuppliers];
      if (inputName === "numbers") {
        newSuppliers[supplierIndex][inputName] = [
          ...(newSuppliers[supplierIndex][inputName] || []),
        ];
        newSuppliers[supplierIndex][inputName][itemIndex] = value;
      } else {
        newSuppliers[supplierIndex][inputName] = value;
      }
      return newSuppliers;
    });

    setDivs((prevDivs) => {
      const updatedDivs = [...prevDivs];
      updatedDivs[divIndex].content = (
        <div
          key={divIndex}
          className="w-72 shadow bg-table_color rounded-lg p-4 flex-none"
        >
          <table className="w-full text-left rounded-full">
            <thead className="text-sm bg-blue-300 font-semibold">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 w-[220px] h-[65px] border-b"
                >
                  <input
                    type="text"
                    placeholder="Supplier Name"
                    className="h-[30px] text-center py-2 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent placeholder:text-gray-700"
                    value={suppliers[supplierIndex].name}
                    onChange={(event) =>
                      handleFormChange(supplierIndex, "name", event, divIndex)
                    }
                  />
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 w-[223px] h-[65px] flex-shrink-0 whitespace-nowrap overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Supplier Address"
                    className="h-[30px] text-center text-ellipsis whitespace-nowrap overflow-hidden bg-transparent placeholder:text-gray-700"
                    value={suppliers[supplierIndex].address}
                    onChange={(event) =>
                      handleFormChange(
                        supplierIndex,
                        "address",
                        event,
                        divIndex
                      )
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-white border-b h-[60px]">
                    <td className="px-6 w-36 border-b h-[50px] flex-shrink-0 whitespace-nowrap overflow-hidden">
                      PHP
                      <input
                        type="number"
                        className="h-[30px] text-center text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
                        value={suppliers[supplierIndex]?.numbers[index] || ""}
                        onChange={(event) =>
                          handleFormChange(
                            supplierIndex,
                            "numbers",
                            event,
                            divIndex,
                            index
                          )
                        }
                      />
                    </td>
                  </tr>
                  {JSON.parse(item.item_description).map((desc, index) => (
                    <tr key={index} className="bg-white border-b h-[56px]">
                      <td className="px-6 w-40 whitespace-nowrap"></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      );
      return updatedDivs;
    });
  };

  // Function to group suppliers into batches of three
  const groupSuppliers = (suppliers) => {
    const batchSize = 3;
    const groupedSuppliers = [];

    for (let i = 0; i < suppliers.length; i += batchSize) {
      groupedSuppliers.push(suppliers.slice(i, i + batchSize));
    }

    return groupedSuppliers;
  };

  // Function to get AOCfile props for the selected batch
  const getAOCFileProps = (batchIndex) => {
    // console.log(groupedSuppliers[batchIndex]);
    return {
      items: items,
      suppliers: groupedSuppliers[batchIndex],
      purpose: pr.purpose,
      winners: parseWinners(winners),
    };
  };

  const addDiv = () => {
    setSuppliers((prevSuppliers) => [
      ...prevSuppliers,
      { name: "", address: "", numbers: [] },
    ]);

    setDivs((prevDivs) => [
      ...prevDivs,
      {
        content: (
          <div
            key={prevDivs.length}
            className="w-72 shadow bg-table_color rounded-lg p-4 flex-none"
          >
            <table className="w-full text-left rounded-full">
              <thead className="text-sm bg-blue-300 font-semibold">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 w-[220px] h-[65px] border-b"
                  >
                    <input
                      type="text"
                      placeholder="Supplier Name"
                      className="h-[30px] text-center py-2 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent placeholder:text-gray-700"
                      value={suppliers[suppliers.length - 1].name}
                      onChange={(event) =>
                        handleFormChange(
                          suppliers.length - 1,
                          "name",
                          event,
                          prevDivs.length
                        )
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 w-[223px] h-[65px] flex-shrink-0 whitespace-nowrap overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Supplier Address"
                      className="h-[30px] text-center text-ellipsis whitespace-nowrap overflow-hidden bg-transparent placeholder:text-gray-700"
                      value={suppliers[suppliers.length - 1].address}
                      onChange={(event) =>
                        handleFormChange(
                          suppliers.length - 1,
                          "address",
                          event,
                          prevDivs.length
                        )
                      }
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="bg-white border-b h-[60px]">
                      <td className="px-6 w-36 border-b h-[50px] flex-shrink-0 whitespace-nowrap overflow-hidden">
                        PHP
                        <input
                          type="number"
                          className="h-[30px] text-center text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
                          value={
                            suppliers[suppliers.length - 1]?.numbers[index] ||
                            ""
                          }
                          onChange={(event) =>
                            handleFormChange(
                              suppliers.length - 1,
                              "numbers",
                              index,
                              event
                            )
                          }
                        />
                      </td>
                    </tr>
                    {JSON.parse(item.item_description).map((desc, index) => (
                      <tr key={index} className="bg-white border-b h-[56px]">
                        <td className="px-6 w-40 whitespace-nowrap"></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
    ]);
    console.log(suppliers);
  };

  const saveAocSuppliers = async () => {
    try {
      const nonEmptySuppliers = suppliers.filter(
        (supplier) =>
          supplier.name || supplier.address || supplier.numbers.length > 0
      );

      const formattedFetchedSuppliers = {
        suppliers: fetchedSuppliers.map((supplier) => ({
          sup_name: supplier.sup_name,
          sup_add: supplier.sup_add,
          prices: JSON.stringify(supplier.prices) || "[]",
        })),
      };

      // console.log(formattedFetchedSuppliers);

      const formattedSuppliers = {
        suppliers: nonEmptySuppliers.map((supplier) => ({
          sup_name: supplier.name || "",
          sup_add: supplier.address || "",
          prices: JSON.stringify(supplier.numbers) || "[]",
        })),
      };
      // console.log(formattedSuppliers);

      const finalSuppliersList = {
        suppliers: [
          ...formattedFetchedSuppliers.suppliers,
          ...formattedSuppliers.suppliers,
        ],
      };

      console.log(finalSuppliersList);
      const response = await axios.put(
        `${baseUrl}/submitted/edit-AocSuppliers/${id}`,
        finalSuppliersList
      );
      console.log(response);
      await handleSetEditing();
    } catch (error) {
      console.error("Error saving suppliers:", error);
    }
  };

  const parseWinners = (winners) => {
    return winners.reduce((result, name, index) => {
      const existingEntry = result.find((entry) => entry.name === name);

      if (existingEntry) {
        existingEntry.indexes.push(index);
      } else {
        result.push({ name, indexes: [index] });
      }

      return result;
    }, []);
  };

  const fetchAOC = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/submitted/get-aocDetails/${id}`
      );

      const aocData = response.data.aoc;
      // console.log(response.data.aoc);
      const json_items = await JSON.parse(response.data.aoc.pr.json_items);

      const initialWinners = Array(json_items.length).fill("");
      setWinners(initialWinners);
      // console.log(winners);

      if (aocData.suppliers) {
        const parsedSuppliers = JSON.parse(aocData.suppliers);
        // console.log(parsedSuppliers);
        const parsedSuppliersWithPrices = parsedSuppliers.map((supplier) => ({
          ...supplier,
          prices: JSON.parse(supplier.prices),
        }));

        await setFetchedSuppliers(parsedSuppliersWithPrices);

        // Group suppliers and set the state
        const grouped = groupSuppliers(parsedSuppliersWithPrices);
        setGroupedSuppliers(grouped);
      }

      if (aocData.winners) {
        const parsedWinners = JSON.parse(aocData.winners);
        // console.log(parsedWinners);
        setWinners(parsedWinners);
        // console.log(winners);
      }

      await setAoc(aocData);
      await setPR(response.data.aoc.pr);
      // console.log(pr);
      await setItems(json_items);
      // console.log(items);
      // console.log(fetchedSuppliers);
      // const winnersWithIndex = parseWinners(winners);
      // console.log(winnersWithIndex);
      // console.log(groupedSuppliers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAOC();
    // console.log(aoc);
    // console.log(aocfileprops);
  }, []);

  const aocfileprops = {
    items: items,
    suppliers: fetchedSuppliers,
    purpose: pr.purpose,
    winners: parseWinners(winners),
  };

  return (
    <div className="flex flex-col">
      {/* modal */}
      {submitting ? (
        <div className="absolute w-full h-full bg-black bg-opacity-25 top-0 left-0 z-50 flex justify-center">
          <div className="relative border bg-white w-1/3 h-1/3 place-self-center rounded-lg shadow flex flex-col px-6 py-10">
            <div className="absolute right-3 top-2">
              <div className="p-3 place-self-end bg-hint bg-center bg-contain bg-no-repeat tooltip">
                <div className="tooltiptext w-auto py-2 bg-slate-100 -right-28 top-5 px-3 text-xs">
                  {groupedSuppliers.map((batch, index) => (
                    <optgroup
                      label={`Batch ${index + 1}`}
                      key={`Batch ${index}`}
                      value={`Batch ${index + 1}`}
                      className="text-black text-left"
                      disabled
                    >
                      {batch.map((supplier, subIndex) => (
                        <option
                          key={`${index}-${subIndex}`}
                          value={`${index}-${subIndex}`}
                        >
                          {supplier.sup_name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-lg">Choose Batch:</div>
            <br />
            <br />
            <select
              name="batch"
              id="batch"
              className="border rounded h-10 w-1/2 place-self-center"
              onChange={async (e) => {
                // console.log(e.target.value);
                await setSelectedBatch(e.target.value);
              }}
            >
              <option value="">Select a batch</option>
              {groupedSuppliers.map((batch, index) => (
                <option value={index} key={`Batch ${index}`}>
                  Batch {index + 1}
                </option>
              ))}
            </select>
            <br />
            <br />
            <div className="place-self-end flex gap-2">
              <button
                className="border w-24 h-10 rounded bg-gray-500 text-white"
                onClick={handleSetSubmitting}
              >
                Cancel
              </button>

              {aocfileprops &&
                Object.keys(aocfileprops).length > 0 &&
                (selectedBatch != null && selectedBatch != "" ? (
                  <PDFDownloadLink
                    document={<AOCfile {...getAOCFileProps(selectedBatch)} />}
                    fileName="AOC.pdf"
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
      <Link to={"/sub-aoc"} className="text-base w-24 text-center ">
        <div className="bg-blue-300 rounded-full p-3 w-full mb-5 hover:scale-110 duration-100">
          Back
        </div>
      </Link>
      <div className="flex justify-between">
        <div className="text-xl font-bold text-text_color place-self-center">
          Abstract of Canvas Details
        </div>

        {editing ? (
          <div className="flex gap-2">
            <button
              onClick={handleSetEditing}
              className="border px-4 bg-red-500 text-white rounded"
            >
              Cancel
            </button>

            <button
              onClick={saveAocSuppliers}
              className="border px-4 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div className=" flex gap-4">
            <button
              onClick={handleSetEditing}
              className="px-4 bg-gray-500 text-white rounded place-self-center"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleCreatePo(aoc.aoc_id);
              }}
              className="place-self-center rounded bg-blue-500 px-3 text-white"
            >
              Create PO
            </button>
            {/* {aocfileprops && Object.keys(aocfileprops).length > 0 && (
              <PDFDownloadLink
                document={<AOCfile {...aocfileprops} />}
                fileName="AOC.pdf"
                className="place-self-center flex"
                // onClick={handlePrintRFQButton}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <button disabled>
                      <div className="text-base text-center drop-shadow-2xl w-64 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100">
                        Loading...
                      </div>
                    </button>
                  ) : (
                    <button className="place-self-center">
                      <img
                        src={download}
                        alt="download"
                        height={30}
                        width={30}
                        className="hover:scale-150 duration-100"
                      />
                    </button>
                  )
                }
              </PDFDownloadLink>
            )} */}
            <button className="place-self-center">
              <img
                src={download}
                alt="download"
                height={30}
                width={30}
                className="hover:scale-150 duration-100"
                onClick={handleSetSubmitting}
              />
            </button>
          </div>
        )}
      </div>

      <div className="flex w-auto gap-4 overflow-auto py-6 px-2 flex-none">
        <div className="w-auto flex-none shadow bg-table_color rounded-lg p-4">
          {items && (
            <table className="w-full text-left rounded-full">
              <thead className="text-sm bg-blue-300 font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-6 w-28  h-[130px]">
                    Item No
                  </th>
                  <th scope="col" className="px-6 py-6 w-28  h-[130px]">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-6 w-28  h-[130px]">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-6 w-40  h-[130px]">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-6 w-36  h-[130px]">
                    Unit Cost (PHP)
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className="bg-white border-b h-[50px]">
                      <td className="px-6 py-4 w-28">{index + 1}</td>
                      <th scope="row" className="px-6 py-4 w-28">
                        {item.item_quantity}
                      </th>
                      <td className="px-6 py-4 w-28">{item.unit}</td>
                      <td className="px-6 py-4 w-40 font-medium text-gray-900 whitespace-nowrap">
                        {item.item_name}{" "}
                      </td>
                      <td className="px-6 py-4 w-36">{item.unit_cost}</td>
                    </tr>
                    {JSON.parse(item.item_description).map(
                      (desc, descIndex) => (
                        <tr
                          key={descIndex}
                          className="bg-white border-b h-[50px]"
                        >
                          <td className="px-6 py-4 w-28"></td>
                          <th scope="row" className="px-6 py-4 w-28"></th>
                          <td className="px-6 py-4 w-28"></td>
                          <td className="px-6 py-4 w-40 whitespace-nowrap">
                            {desc}
                          </td>
                          <td className="px-6 py-4 w-36"></td>
                        </tr>
                      )
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {fetchedSuppliers.length > 0 &&
          fetchedSuppliers.map((supplier, index) => (
            <div
              key={index}
              className="w-72 shadow bg-table_color rounded-lg p-4 flex-none"
            >
              <table className="w-full text-left rounded-full">
                <thead className="text-sm bg-blue-300 font-semibold">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 w-[220px] h-[65px] border-b"
                    >
                      <input
                        type="text"
                        placeholder="Supplier Name"
                        className="h-[30px] text-center py-2 text-ellipsis whitespace-nowrap overflow-hidden bg-transparent placeholder:text-gray-700"
                        value={supplier.sup_name || ""}
                        onChange={() => {}}
                      />
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 w-[223px] h-[65px] flex-shrink-0 whitespace-nowrap overflow-hidden"
                    >
                      <input
                        type="text"
                        placeholder="Supplier Address"
                        className="h-[30px] text-center text-ellipsis whitespace-nowrap overflow-hidden bg-transparent placeholder:text-gray-700"
                        value={supplier.sup_add || ""}
                        onChange={() => {}}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="bg-white border-b h-[60px]">
                        <td className="px-6 w-36 border-b h-[50px] flex-shrink-0 whitespace-nowrap overflow-hidden">
                          PHP
                          <input
                            type="number"
                            className="h-[30px] text-center text-ellipsis whitespace-nowrap overflow-hidden bg-transparent"
                            value={supplier.prices[index]}
                            onChange={() => {}}
                          />
                        </td>
                      </tr>
                      {JSON.parse(item.item_description).map((desc, index) => (
                        <tr key={index} className="bg-white border-b h-[56px]">
                          <td className="px-6 w-40 whitespace-nowrap"></td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

        {divs.map((div, index) => (
          <div key={index}>{div.content}</div>
        ))}

        {editing && (
          <button
            type="button"
            onClick={addDiv}
            className="drop-shadow-xl text-lg hover:bg-blue-100 duration-100 rounded-lg flex-none"
            style={{ textAlign: "center" }}
          >
            <img src={plus} alt="plus_icon" width={35} height={35} />
          </button>
        )}

        <div className="w-72 shadow bg-table_color rounded-lg p-4 flex-none">
          <table className="w-full text-left rounded-full">
            <thead className="text-sm bg-blue-300 font-semibold">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-6 w-28 h-[130px] text-center"
                >
                  Winners
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="bg-white border-b h-[60px]">
                      <td className="px-6 w-36 border-b h-[50px] flex-shrink-0 whitespace-nowrap overflow-hidden">
                        <select
                          name={`supplier_winner_${index}`}
                          id={`supplier_winner_${index}`}
                          className="w-48"
                          onChange={(event) => handleSelectChange(event, index)}
                        >
                          <option value="" default className="text-gray-600">
                            {winners[index] == ""
                              ? "Select Winner"
                              : winners[index]}
                          </option>
                          {fetchedSuppliers.length > 0 &&
                            fetchedSuppliers.map((supplier, index) => (
                              <option key={index} value={supplier.sup_name}>
                                {supplier.sup_name}
                              </option>
                            ))}
                        </select>
                      </td>
                    </tr>
                    {JSON.parse(item.item_description).map((desc, index) => (
                      <tr key={index} className="bg-white border-b h-[56px]">
                        <td className="px-6 w-40 whitespace-nowrap"></td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Aoc_Details;
