import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PO = () => {
  const [po, setPo] = useState([]);

  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  const fetchPo = async () => {
    try {
      const response = await axios.get(`${baseUrl}/submitted/fetch_po`);
      // console.log(response.data.po);
      await setPo(response.data.po);
      // console.log(po);
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  useEffect(() => {
    fetchPo();
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-bold text-text_color drop-shadow-sm mb-8">
        Purchase Order List
      </div>

      <div className="mt-6 w-full shadow-xl bg-table_color rounded-md">
        <div className="h-full m-5">
          <table className="w-full text-md text-left rounded-full">
            <thead className="text-sm bg-blue-300 font-semibold">
              <tr>
                <th scope="col" className="px-6 py-3">
                  PO Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Submit Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {po &&
                po.map((po) => (
                  <tr className="bg-white border-b" key={po.po_id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to={`/po-details/${po.po_id}`}>
                        <div className="font-semibold hover:underline hover:text-blue-500 duration-100">
                          {po.po_id}
                        </div>
                      </Link>
                    </th>

                    <td className="px-6 py-4">Sample Date</td>

                    <td className={"pl-5 py-4"}>icons here</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PO;
