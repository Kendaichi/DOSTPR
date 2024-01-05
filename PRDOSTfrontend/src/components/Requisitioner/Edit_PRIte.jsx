import { useState, useEffect } from "react";
import axios from "axios";
import plus from "../../assets/plus.png";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditPRIte = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [items, setItems] = useState([]);

  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchPrData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pr/get-pr/${id}`);
      const jsonData = response.data.pr;

      // Parse the "json_items" field
      const json_items = JSON.parse(jsonData.json_items);
      console.log(json_items);

      // Parse the "item_description" field for each row
      const itemsWithParsedDescription = json_items.map((item) => {
        // Ensure that item_description is a string before parsing
        if (typeof item.item_description === "string") {
          return {
            ...item,
            item_description: JSON.parse(item.item_description),
          };
        }
        // If item_description is not a string, handle it accordingly
        return item;
      });

      setItems(itemsWithParsedDescription);
      console.log(items);
    } catch (error) {
      console.error("Error fetching PR data:", error);
    }
  };

  useEffect(() => {
    fetchPrData();
  }, []);

  // Function to add a new row
  const addRow = () => {
    setItems((prevItems) => {
      const newRow = {
        unit: "",
        item_name: "",
        item_description: [""],
        item_quantity: 0,
        unit_cost: 0,
        total: 0,
      };
      return [...prevItems, newRow];
    });
  };

  const addDescription = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].item_description.push("");
      return updatedItems;
    });
  };

  const updateRowData = (index, field, value) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];

      if (field === "item_quantity" || field === "unit_cost") {
        // Ensure value is a valid number; handle empty strings as well
        updatedItems[index][field] = value === "" ? "" : parseFloat(value);
      } else {
        updatedItems[index][field] = value;
      }

      // Calculate and update the total
      updatedItems[index].total = calculateTotal(updatedItems[index]);

      return updatedItems;
    });
  };

  const calculateTotal = (row) => {
    const { item_quantity, unit_cost } = row;
    return item_quantity * unit_cost;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(items);

    const formattedRows = items.map((item) => ({
      ...item,
      item_description: JSON.stringify(item.item_description),
    }));

    // console.log(formattedRows);

    const requestData = {
      items: formattedRows,
    };

    try {
      const response = await axios.put(
        `${baseUrl}/pr/edit-prIte/${id}`,
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
        EDIT PROCUREMENT REQUEST - Items
      </div>

      {items && (
        <div className="p-5 shadow-lg rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <table className="w-full text-md text-left rounded-full mt-5">
              <thead className="text-sm bg-blue-300 font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Description
                  </th>
                  <th scope="col" className="px-6 py-3 w-32">
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
              <tbody className="overflow-hidden">
                {items.map((row, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 border-2 border-blue-200">
                      <input
                        className="w-full p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                        type="text"
                        name="unit"
                        value={row.unit}
                        onChange={(e) =>
                          updateRowData(index, "unit", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 border-2 border-blue-200">
                      <input
                        className="w-full p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                        type="text"
                        name="item_name"
                        value={row.item_name}
                        onChange={(e) =>
                          updateRowData(index, "item_name", e.target.value)
                        }
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 border-2 border-blue-200 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {row.item_description.map((desc, descIndex) => (
                        <div key={descIndex}>
                          <input
                            className="w-full p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                            type="text"
                            name={`description-${index}-${descIndex}`}
                            value={desc}
                            onChange={(e) => {
                              const newDescriptions = [...row.item_description];
                              newDescriptions[descIndex] = e.target.value;
                              updateRowData(
                                index,
                                "item_description",
                                newDescriptions
                              );
                            }}
                          />
                        </div>
                      ))}
                      {/* {JSON.parse(row.item_description)} */}
                      <button
                        type="button"
                        onClick={() => addDescription(index)}
                        className="w-full drop-shadow-xl text-lg hover:bg-blue-100 duration-100 rounded-lg"
                      >
                        <img
                          src={plus}
                          alt="plus_icon"
                          width={20}
                          height={20}
                          style={{
                            display: "block",
                            margin: "auto",
                            marginTop: "10px",
                          }}
                        />
                      </button>
                    </th>
                    <td className="px-6 py-4 border-2 border-blue-200">
                      <input
                        className="w-full p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                        type="number"
                        name="item_quantity"
                        value={row.item_quantity}
                        onChange={(e) =>
                          updateRowData(index, "item_quantity", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 border-2 border-blue-200">
                      <div className="flex">
                        <div className="place-self-center">PHP</div>
                        <input
                          className="w-full p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                          type="number"
                          name="unit_cost"
                          value={row.unit_cost}
                          onChange={(e) =>
                            updateRowData(index, "unit_cost", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 border-2 border-blue-200">
                      <div className="flex">
                        <div className="place-self-center">PHP</div>
                        <input
                          className="w-full p-2.5 ml-2 placeholder-slate-500 focus:outline-none bg-gray-100 text-black text-md rounded-lg drop-shadow-lg"
                          type="number"
                          name="total"
                          value={row.total}
                          readOnly
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              onClick={addRow}
              className="w-full drop-shadow-xl text-lg hover:bg-blue-100 duration-100 rounded-lg"
              style={{ textAlign: "center" }}
            >
              <img
                src={plus}
                alt="plus_icon"
                width={30}
                height={30}
                style={{
                  display: "block",
                  margin: "auto",
                  marginTop: "10px",
                }}
              />
            </button>
            <br />
            <input
              type="submit"
              value="Submit"
              className="place-self-end text-lg text-center drop-shadow-2xl w-52 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPRIte;
