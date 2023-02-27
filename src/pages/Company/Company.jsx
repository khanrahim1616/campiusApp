import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignedOut } from "../../Helper/Helper";
import { Link } from "react-router-dom";
import { Modall } from "./ApplyModal";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Company = () => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [studentApplied, setStudentApplied] = useState();
  const dispatch = useDispatch();

  const appliedCheck = (uid) => {
    const studentData = state?.appliedStudentData.filter((val) =>
      uid.includes(val.uid)
    );
    setOpen(true);
    setStudentApplied(studentData);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
        <Link to="/CompanyJobPost">JobPost</Link>
        <br />
        <Link to="/CompanyPostedJob">CompanyPostedJob</Link>
        <br />
        <Link to="/Profile">Profile</Link>
        <br />
        <button onClick={() => SignedOut(dispatch)}>Logout</button>
      </div>
      <div>
        {state?.appliedJobs?.length > 0 ? (
          <div className="tableContainer">
            <h3>Student applied on these jobs</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.no</TableCell>
                    <TableCell align="right">Job category</TableCell>
                    <TableCell align="right">Education</TableCell>
                    <TableCell align="right">Experience</TableCell>
                    <TableCell align="right">Apply check</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state?.appliedJobs.map((item, i) => {
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
                        <TableCell align="right">{item.jobCategory}</TableCell>
                        <TableCell align="right">{item.education}</TableCell>
                        <TableCell align="right">{item.experience}</TableCell>
                        <TableCell
                          align="right"
                          onClick={() => appliedCheck(item.appliedJobs)}
                        >
                          action
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
        <div>
          <Modall onClose={handleClose} open={open} data={studentApplied} />
        </div>
      )}
    </div>
  );
};

export default Company;
