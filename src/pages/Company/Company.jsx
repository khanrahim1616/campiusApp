import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { GET_FIREBASE_DATA } from "../../reducer/types";
import { Link } from "react-router-dom";
import { Modall } from "./Modal";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Company = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [studentApplied, setStudentApplied] = useState();

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
        <button onClick={signedOut}>Logout</button>
      </div>
      <div>
        {state?.appliedJobs.length > 0 ? (
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
                    <TableCell align="right">apply check</TableCell>
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
