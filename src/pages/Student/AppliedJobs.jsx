import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignedOut } from "../../Helper/Helper";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AppliedJobs = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Link to={"*"}>Student</Link>
        <button onClick={() => SignedOut(dispatch)}>Logout</button>
      </div>
      {state?.appliedJobs?.length > 0 ? (
        <div className="tableContainer">
          <h1>Applied Jobs</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell align="right">Company name</TableCell>
                  <TableCell align="right">Job category</TableCell>
                  <TableCell align="right">Education</TableCell>
                  <TableCell align="right">Experience</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state?.appliedJobs?.map((item, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="right">{item.username}</TableCell>
                      <TableCell align="right">{item.jobCategory}</TableCell>
                      <TableCell align="right">{item.education}</TableCell>
                      <TableCell align="right">{item.experience}</TableCell>
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
  );
};

export default AppliedJobs;
