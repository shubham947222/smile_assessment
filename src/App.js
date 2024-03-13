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

  useEffect(() => {
    if (search?.length === 0) {
      setFilterredData([]);
      return;
    }
    let timer = setTimeout(() => {
      const filterData = csvData.filter((each) =>
        each.toLowerCase().includes(search.toLowerCase())
      );
      setFilterredData(filterData);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <h1>Search Your Medicine</h1>
      <div>
        <input
          type="text"
          name="shubh"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredData?.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default App;
