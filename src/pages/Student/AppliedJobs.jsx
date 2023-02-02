import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { GET_FIREBASE_DATA } from "../../reducer/types";
import { Link } from "react-router-dom";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const signedOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: GET_FIREBASE_DATA,
          payload: false,
        });
      })
      .catch((error) => {});
  };

  console.log(state?.appliedJobs);

  return (
    <div>
<div>
      <Link to={"*"}>Student</Link>
      <button onClick={signedOut}>Logout</button>
</div>
      {state?.appliedJobs.length > 0 ? (
        <div className="tableContainer">
          <h1>Applied Jobs</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell align="right">Job category</TableCell>
                  <TableCell align="right">Job Address</TableCell>
                  <TableCell align="right">Education</TableCell>
                  <TableCell align="right">Experience</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state?.appliedJobs.map((e, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="right">{e.jobCategory}</TableCell>
                      <TableCell align="right">{e.jobAddress}</TableCell>
                      <TableCell align="right">{e.education}</TableCell>
                      <TableCell align="right">{e.experience}</TableCell>
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
