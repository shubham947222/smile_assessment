import { useEffect, useState } from "react";
import CSV from "./data.csv";
// import csvParse from "csv-parse";
import CSVReader from "react-csv-reader";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [filteredData, setFilterredData] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(search?.length, "search");
  console.log(filteredData, "filteredData");
  useEffect(() => {
    if (search?.length === 0) {
      setFilterredData([]);
    }
    setTimeout(() => {
      const filterData = csvData.filter((each) => each.includes(search));
      setFilterredData(filterData);
    }, 300);
  }, [search]);

  const fetchData = async () => {
    fetch(CSV)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          const data = parseCSV(text);
          console.log(data.flat());
          setCsvData(data.flat());
        };
        reader.readAsText(blob);
      })
      .catch((error) => console.error("Error fetching CSV file:", error));
  };

  const parseCSV = (text) => {
    const rows = text.split("\n");
    const data = rows.map((row) => row.split(","));
    return data;
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <input
          type="text"
          name="shubh"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="card d-flex flex-column justify-content-center align-items-center "
          style={{
            height: "400px",
            overflowY: "scroll",
          }}
        >
          {filteredData?.map((each) => (
            <p>{each}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
