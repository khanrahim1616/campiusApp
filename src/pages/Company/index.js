import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modall } from "../../components/ApplyCheckModal";
import { allJobsColumns, allJobsRow } from "../../Helper/companyHelper";
import Navbar from "../../components/Navbar";
import GridTable from "../../components/GridTable";
import "./company&JobPost.css";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";

const Company = () => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [studentApplied, setStudentApplied] = useState();
  const [alert, setAlert] = useState(false);

  var data = {
    row: allJobsRow(state),
    column: allJobsColumns(state, setOpen, setStudentApplied, setAlert),
  };

  useEffect(() => {
    setStudentApplied(
      state?.appliedStudentData.filter((val) =>
        open.studenIds?.some((item) => item === val.uid)
      )
    );
  }, [state?.appliedStudentData, state?.jobData]);

  return (
    <div>
      <Navbar />
      <div>
        <GridTable data={data} />
      </div>
      {open && <Modall setOpen={setOpen} open={open} data={studentApplied} />}
      {!!alert?.isSuccess && (
        <SuccessAlert
          message={"Job deleted successfully"}
          open={!!alert?.isSuccess}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
      {!!alert?.isNotSuccess && (
        <ErrorAlert
          message={"Something went wrong"}
          open={!!alert?.isNotSuccess}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default Company;
