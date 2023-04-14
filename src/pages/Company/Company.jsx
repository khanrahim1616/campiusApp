import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modall } from "../../components/ApplyCheckModal/companyApplyCheckModal";
import { allJobsColumns, allJobsRow } from "../../Helper/companyHelper";
import Navbar from "../../components/Navbar/Navbar";
import GridTable from "../../components/GridTable/GridTable";
import "./company&JobPost.css";

const Company = () => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [studentApplied, setStudentApplied] = useState();

  var data = {
    row: allJobsRow(state),
    column: allJobsColumns(state, setOpen, setStudentApplied),
  };

  return (
    <div>
      <Navbar />
      <div>
        <GridTable data={data} />
      </div>
      {open && <Modall setOpen={setOpen} open={open} data={studentApplied} />}
    </div>
  );
};

export default Company;
