import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./gridTable.css";

const GridTable = ({ data }) => {
  return (
    <>
      <div className="tableContainer">
        <div style={{ height: 400, width: "100%", margin: "0 auto" }}>
          <DataGrid
            columns={data.column || []}
            rows={data.row || []}
            pageSize={5}
            // rowsPerPageOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
};

export default GridTable;
