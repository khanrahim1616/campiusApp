import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { GET_FIREBASE_DATA } from "../../reducer/types";
import { ref, update } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { Link } from "react-router-dom";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Student = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  console.log(state?.appliedJobs);

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

  const apply = async (e, i) => {
    await update(ref(db, "Jobs/" + e.companyId + "/" + e.id), {
      appliedJobs: [...(e?.appliedJobs || []), state?.userData.uid],
    });
  };
  return (
    <div>
      <div>
        <Link to={"/AppliedJobs"}>AppliedJobs</Link>
        <button onClick={signedOut}>Logout</button>
      </div>
      {state?.jobData.length > 0 ? (
        <div className="tableContainer">
          <h1>Jobs for you</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell align="right">Job category</TableCell>
                  <TableCell align="right">Job Address</TableCell>
                  <TableCell align="right">Education</TableCell>
                  <TableCell align="right">Experience</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state?.jobData.map((e, i) => {
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
                      <TableCell onClick={() => apply(e, i)} align="right">
                        Apply
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>No job for you According your experience</div>
      )}
    </div>
  );
};

export default Student;
