import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modall } from "../components/companyApplyCheckModal";
import { remove, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../components/Navbar";

const Company = () => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [studentApplied, setStudentApplied] = useState();

  const appliedCheck = (uid) => {
    const studentData = state?.appliedStudentData.filter((val) =>
      uid?.some((item) => item === val.uid)
    );
    setOpen(true);
    setStudentApplied(studentData);
  };

  const dlete = async (id) => {
    await remove(ref(db, `Jobs/${state?.userData?.uid}/${id}`))
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Navbar />
      <div>
        {state?.jobData?.length ? (
          <div className="tableContainer">
            <h3 style={{ textAlign: "center" }}>Jobs</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.no</TableCell>
                    <TableCell>Job-category</TableCell>
                    <TableCell>Education</TableCell>
                    <TableCell>Experience</TableCell>
                    <TableCell>Apply-check</TableCell>
                    <TableCell>Delete job</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state?.jobData.map((item, i) => {
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell>{item.jobCategory}</TableCell>
                        <TableCell>{item.education}</TableCell>
                        <TableCell>{item.experience}</TableCell>
                        <TableCell
                          onClick={() => appliedCheck(item.appliedJobs)}
                        >
                          action
                        </TableCell>
                        <TableCell onClick={() => dlete(item.id)}>
                          Delete
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div>
            <p>No Applied Jobs</p>
          </div>
        )}
      </div>
      {open && (
        <Modall onClose={handleClose} open={open} data={studentApplied} />
      )}
    </div>
  );
};

export default Company;
