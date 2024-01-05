import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import plus from "../../../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RFQFile from "../../pdf_templates/RFQFile";

const Aoc_Details = () => {
  const [aoc, setAoc] = useState([]);
  const [pr, setPR] = useState([]);
  const [items, setItems] = useState([]);
  // const [divs, setDivs] = useState([]);
  const [suppliers, setSuppliers] = useState([
    { sup_name: "", sup_add: "", prices: [] },
  ]);

  // const auth = useAuthUser();
  const { id } = useParams();
  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const fetchAOC = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/submitted/get-aocDetails/${id}`
      );

      const aocData = response.data.aoc;

      const parsedSuppliers = JSON.parse(aocData.suppliers);

      const parsedSuppliersFinal = JSON.parse(parsedSuppliers);

      const parsedSuppliersWithPrices = parsedSuppliersFinal.map(
        (supplier) => ({
          ...supplier,
          prices: JSON.parse(supplier.prices),
        })
      );

      setAoc(aocData);
      setPR(aocData.pr);
      setSuppliers(parsedSuppliersWithPrices);

      const json_items = JSON.parse(aocData.pr.json_items);
      setItems(json_items);

      console.log(suppliers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAOC();
    // console.log("Component rerendered with suppliers:", suppliers);
  }, []);

  return (
    <div className="flex flex-col">
      <Link to={"/sub-aoc"} className="text-base w-24 text-center ">
        <div className="bg-blue-300 rounded-full p-3 w-full mb-5 hover:scale-110 duration-100">
          Back
        </div>
      </Link>
      <div className="flex justify-between">
        <div className="text-xl font-bold text-text_color place-self-center">
          Abstract of Canvas Details
        </div>

        <Link to={`/edit-aoc/${id}`} className="text-base w-24 text-center ">
          <div className="bg-blue-300 rounded-full p-3 w-full mb-5 hover:scale-110 duration-100">
            Edit
          </div>
        </Link>

        {/* {prfileProps && (
          <PDFDownloadLink
            document={<RFQFile {...prfileProps} />}
            fileName="RFQ.pdf"
            className="place-self-end mt-5"
            onClick={handlePrintRFQButton}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <button disabled>
                  <div className="text-base text-center drop-shadow-2xl w-64 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100">
                    Loading...
                  </div>
                </button>
              ) : (
                <button>
                  <div className="text-base text-center drop-shadow-2xl w-64 p-3 bg-blue-300 shadow-lg rounded-full mb-5 hover:scale-110 duration-100">
                    Print RFQ Document
                  </div>
                </button>
              )
            }
          </PDFDownloadLink>
        )} */}
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

        {suppliers.map((supplier, index) => (
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
      </div>
    </div>
  );
};

export default Aoc_Details;
