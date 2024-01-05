import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Aoc = () => {
  const [aoc, setAoc] = useState([]);
  // const auth = useAuthUser();
  // const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "http://192.168.1.101:8000";

  //fetching PRs
  const fetchAOC = async () => {
    try {
      const response = await axios.get(`${baseUrl}/submitted/fetch-aoc`);
      // console.log(response.data.aoc);
      await setAoc(response.data.aoc);
      // console.log(aoc);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    fetchAOC();
  }, []);

  return (
    <div className="w-full">
      <div className="text-xl font-bold text-text_color drop-shadow-sm mb-8">
        Abstract of Canvas List
      </div>

      <div className="mt-6 w-full shadow-xl bg-table_color rounded-md">
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
              </tr>
            </thead>
            <tbody>
              {aoc &&
                aoc.map((aoc) => (
                  <tr className="bg-white border-b" key={aoc.aoc_id}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to={`/details-aoc/${aoc.aoc_id}`}>
                        <div className="font-semibold hover:underline hover:text-blue-500 duration-100">
                          {aoc.pr && aoc.pr.office ? aoc.pr.office : ""}
                        </div>
                      </Link>
                    </th>

                    <td className="px-6 py-4">
                      {aoc.pr && aoc.pr.submitted_at
                        ? formatDate(aoc.pr.submitted_at)
                        : ""}
                    </td>

                    <td className={"pl-5 py-4"}>
                      {" "}
                      {aoc.pr && aoc.pr.status ? aoc.pr.status : ""}
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

export default Aoc;
