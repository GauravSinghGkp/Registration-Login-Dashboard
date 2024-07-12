import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";

const DataGrid = () => {
  // Default Col Def
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filterParams: {
        buttons: ["reset"],
      },
      minWidth: 150,
      resizable: true,
    };
  }, []);

  const [rowData, setRowData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isDarkMode, setDarkMode] = useState(true); // Mode Dark/Light

  const [columnDefs] = useState([
    {
      headerName: "Company",
      field: "make",
      sortable: true,
      filter: true,
    },
    { headerName: "Model", field: "model", sortable: true, filter: true },
    {
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
      valueFormatter: (p) => "$" + p.value.toLocaleString(),
    },
    {
      headerName: "Electric",
      field: "electric",
      sortable: true,
      filter: true,
      cellRenderer: (params) => (params.value ? "Yes" : "No"),
    },
  ]);

  useEffect(() => {
    // get data from api and set to row data
    axios
      .get("https://gauravsinghgkp.github.io/cars-api/cars.json")
      .then((response) => {
        setRowData(response.data);
      });

    // Set isMobile true/false based on width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`ag-theme-quartz${isDarkMode ? "-dark" : ""} p-2`}
      style={{ height: "550px", width: "100vw" }}>
      {/* Button for light mode and dark mode */}
      <button
        className={`mb-2 px-4 py-2 rounded-md ${
          isDarkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800 border border-gray-300"
        }`}
        onClick={() => setDarkMode((prev) => !prev)}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={isMobile ? false : 10}
        paginationAutoPageSize={isMobile}
        paginationPageSizeSelector={isMobile ? [10] : [10, 20, 50]}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default DataGrid;
