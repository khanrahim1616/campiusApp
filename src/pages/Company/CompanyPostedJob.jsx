import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import * as types from "../../reducer/types";
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

const CompanyPostedJob = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const signedOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: types.GET_FIREBASE_DATA,
          payload: false,
        });
      })
      .catch((error) => {});
  };

  const dlete = async (id) => {
    await remove(ref(db, `Jobs/${state?.userData?.uid}/${id}`))
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div>
        <Link to="/">Company</Link>
        <br />
        <Link to="/CompanyJobPost">JobPost</Link>
        <br />
        <button onClick={signedOut}>Logout</button>
      </div>
      {state?.jobData.length > 0 && (
        <div className="tableContainer">
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
                      <TableCell onClick={() => dlete(e.id)} align="right">
                        Delete
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default CompanyPostedJob;
